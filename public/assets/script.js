document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.getElementById("backButton");
    const youtubeFrames = document.querySelectorAll(".image-carousel iframe");
    const youtubePlayers = new Map();

    const isCarouselVisible = function (carousel) {
        const rect = carousel.getBoundingClientRect();
        const visibleWidth = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
        const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
        return rect.width > 0 && rect.height > 0 && visibleWidth * visibleHeight >= rect.width * rect.height * 0.45;
    };

    const syncYoutubePlayers = function (carousel) {
        if (!carousel) {
            return;
        }

        const activeIndex = Math.round(carousel.scrollLeft / Math.max(carousel.clientWidth, 1));
        const carouselIsVisible = isCarouselVisible(carousel);
        carousel.querySelectorAll("iframe").forEach(function (frame, index) {
            const player = youtubePlayers.get(frame);
            if (!player) {
                return;
            }

            if (carouselIsVisible && index === activeIndex) {
                player.playVideo();
            } else {
                player.pauseVideo();
            }
        });
    };

    if (youtubeFrames.length > 0) {
        youtubeFrames.forEach(function (frame) {
            const frameUrl = new URL(frame.src);
            frameUrl.searchParams.set("origin", window.location.origin);
            frame.src = frameUrl.toString();
        });

        const initializeYoutubePlayers = function () {
            youtubeFrames.forEach(function (frame, index) {
                frame.id = frame.id || "youtube-segment-loop-" + index;
                new window.YT.Player(frame.id, {
                    events: {
                        onReady: function (event) {
                            youtubePlayers.set(frame, event.target);
                            event.target.mute();
                            syncYoutubePlayers(frame.closest(".image-carousel"));
                        },
                        onStateChange: function (event) {
                            const carousel = frame.closest(".image-carousel");
                            const activeIndex = Math.round(carousel.scrollLeft / Math.max(carousel.clientWidth, 1));
                            if (event.data === window.YT.PlayerState.ENDED && frame.dataset.loopStart && isCarouselVisible(carousel) && carousel.querySelectorAll("iframe")[activeIndex] === frame) {
                                event.target.seekTo(Number(frame.dataset.loopStart), true);
                                event.target.playVideo();
                            }
                        }
                    }
                });
            });
        };

        if (window.YT && window.YT.Player) {
            initializeYoutubePlayers();
        } else {
            window.onYouTubeIframeAPIReady = initializeYoutubePlayers;
            const playerApi = document.createElement("script");
            playerApi.src = "https://www.youtube.com/iframe_api";
            document.head.append(playerApi);
        }
    }

    if (backButton && backButton.tagName !== "A") {
        backButton.addEventListener("click", function () {
            window.location.href = backButton.dataset.back || "/";
        });
    }

    document.querySelectorAll(".image-carousel").forEach(function (carousel) {
        const slides = Array.from(carousel.querySelectorAll("img, video, iframe"));
        if (slides.length < 2) {
            return;
        }

        const shouldCloneSlides = !slides.some(function (slide) {
            return slide.tagName === "IFRAME";
        });
        if (shouldCloneSlides) {
            const firstClone = slides[0].cloneNode(true);
            const lastClone = slides[slides.length - 1].cloneNode(true);
            firstClone.setAttribute("aria-hidden", "true");
            lastClone.setAttribute("aria-hidden", "true");
            carousel.append(firstClone);
            carousel.prepend(lastClone);
        }

        const videos = Array.from(carousel.querySelectorAll("video"));
        const getStartTime = function (video) {
            return Number(video.dataset.startTime || 0);
        };
        const setVideoStartTime = function (video) {
            const startTime = getStartTime(video);
            if (startTime > 0 && video.readyState >= 1) {
                video.currentTime = Math.min(startTime, video.duration || startTime);
            }
        };
        const stopOtherVideos = function (activeVideo) {
            videos.forEach(function (video) {
                if (video !== activeVideo) {
                    video.pause();
                    setVideoStartTime(video);
                }
            });
        };
        const playVisibleVideo = function () {
            const slideIndex = Math.round(carousel.scrollLeft / scrollAmount());
            const activeVideo = carousel.children[slideIndex]?.tagName === "VIDEO"
                ? carousel.children[slideIndex]
                : null;
            stopOtherVideos(activeVideo);
            if (activeVideo) {
                setVideoStartTime(activeVideo);
                activeVideo.play().catch(function () {});
            }
        };
        videos.forEach(function (video) {
            video.addEventListener("loadedmetadata", function () {
                setVideoStartTime(video);
            });
            video.addEventListener("ended", function () {
                setVideoStartTime(video);
                video.play().catch(function () {});
            });
            video.addEventListener("play", function () {
                stopOtherVideos(video);
            });
        });

        const previousButton = document.createElement("button");
        const nextButton = document.createElement("button");
        previousButton.type = "button";
        nextButton.type = "button";
        previousButton.className = "carousel-button carousel-previous";
        nextButton.className = "carousel-button carousel-next";
        previousButton.textContent = "←";
        nextButton.textContent = "→";
        previousButton.setAttribute("aria-label", "Previous slide");
        nextButton.setAttribute("aria-label", "Next slide");

        const controls = document.createElement("div");
        controls.className = "carousel-controls";
        controls.append(previousButton, nextButton);
        carousel.insertAdjacentElement("afterend", controls);

        let currentSlide = shouldCloneSlides ? 1 : 0;
        const scrollAmount = function () { return carousel.clientWidth; };
        carousel.scrollLeft = shouldCloneSlides ? scrollAmount() : 0;
        carousel.addEventListener("scroll", function () {
            playVisibleVideo();
            syncYoutubePlayers(carousel);
        }, { passive: true });

        const visibilityObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                playVisibleVideo();
            } else {
                stopOtherVideos(null);
            }
            syncYoutubePlayers(carousel);
        }, { threshold: 0.45 });
        visibilityObserver.observe(carousel);

        previousButton.addEventListener("click", function () {
            stopOtherVideos(null);
            currentSlide = shouldCloneSlides ? currentSlide - 1 : Math.max(0, currentSlide - 1);
            carousel.scrollTo({ left: currentSlide * scrollAmount(), behavior: "smooth" });
            if (shouldCloneSlides && currentSlide === 0) {
                window.setTimeout(function () {
                    currentSlide = slides.length;
                    carousel.scrollLeft = currentSlide * scrollAmount();
                }, 350);
            }
        });

        nextButton.addEventListener("click", function () {
            stopOtherVideos(null);
            currentSlide = shouldCloneSlides ? currentSlide + 1 : Math.min(slides.length - 1, currentSlide + 1);
            carousel.scrollTo({ left: currentSlide * scrollAmount(), behavior: "smooth" });
            if (shouldCloneSlides && currentSlide === slides.length + 1) {
                window.setTimeout(function () {
                    currentSlide = 1;
                    carousel.scrollLeft = scrollAmount();
                }, 350);
            }
        });
    });
});

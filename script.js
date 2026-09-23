document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.getElementById("backButton");

    if (backButton && backButton.tagName !== "A") {
        backButton.addEventListener("click", function () {
            window.location.href = backButton.dataset.back || "/";
        });
    }

    document.querySelectorAll(".image-carousel").forEach(function (carousel) {
        const slides = Array.from(carousel.querySelectorAll("img, video"));
        if (slides.length < 2) {
            return;
        }

        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);
        firstClone.setAttribute("aria-hidden", "true");
        lastClone.setAttribute("aria-hidden", "true");
        carousel.append(firstClone);
        carousel.prepend(lastClone);

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

        let currentSlide = 1;
        const scrollAmount = function () { return carousel.clientWidth; };
        carousel.scrollLeft = scrollAmount();
        carousel.addEventListener("scroll", playVisibleVideo, { passive: true });

        const visibilityObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                playVisibleVideo();
            } else {
                stopOtherVideos(null);
            }
        }, { threshold: 0.45 });
        visibilityObserver.observe(carousel);

        previousButton.addEventListener("click", function () {
            stopOtherVideos(null);
            currentSlide -= 1;
            carousel.scrollTo({ left: currentSlide * scrollAmount(), behavior: "smooth" });
            if (currentSlide === 0) {
                window.setTimeout(function () {
                    currentSlide = slides.length;
                    carousel.scrollLeft = currentSlide * scrollAmount();
                }, 350);
            }
        });

        nextButton.addEventListener("click", function () {
            stopOtherVideos(null);
            currentSlide += 1;
            carousel.scrollTo({ left: currentSlide * scrollAmount(), behavior: "smooth" });
            if (currentSlide === slides.length + 1) {
                window.setTimeout(function () {
                    currentSlide = 1;
                    carousel.scrollLeft = scrollAmount();
                }, 350);
            }
        });
    });
});

export default async function handler(req, res) { //request data from client and send it back to server

    try {

        const date = new Date.toISOString().split("T")[0]; //Converting the data into YYYY-MM-DD in UTC

        const response = await fetch(
            'https://api.balldontlie.io/v1/games?dates[]=${date}&per_page=100',
            {
                headers: {
                    Authorization: process.env.BDL_API_KEY
                }
            }
        );

        const data = await response.json();

        res.status(200).json({
            date,
            games: data.data,
        });
    } catch (error) {
        res.status(500).json({error: error.toString()});
    }

}
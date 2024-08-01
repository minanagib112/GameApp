export class Details {
  constructor(gameId, ui) {
    this.ui = ui;
    this.loading = document.querySelector(".loading");
    this.getDetails(gameId);
    
    document.getElementById("btnClose").addEventListener("click", () => {
      document.querySelector(".details").classList.add("d-none");
      document.querySelector(".games").classList.remove("d-none");
    });
  }

  async getDetails(gameId) {
    this.loading.classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "d2bc209edemsh6b3750149e60bd0p111a2ajsn0d4c93df5b71",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    try {
      let response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`,
        options
      );
      let data = await response.json();
      this.loading.classList.add("d-none");
      console.log("data", data);

      this.ui.displayDetails(data);
    } catch (error) {
      console.error("Failed to fetch game details:", error);
      return null;
    }
  }
}

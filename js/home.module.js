import { Ui } from "./ui.module.js";
import { Details } from "./details.module.js";

export class Home {
  constructor() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        this.changeLink(link);
        const dataCategory = link.dataset.category;
        this.getGames(dataCategory);
      });
    });
    this.loading = document.querySelector(".loading");
    this.details = document.querySelector(".details");
    this.games = document.querySelector("#games");

    this.ui = new Ui();

    this.getGames("mmorpg");
  }

  changeLink(link) {
    document.querySelector(".navbar-nav .active").classList.remove("active");
    link.classList.add("active");
  }

  async getGames(dataCategory) {
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
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${dataCategory}`,
        options
      );
      let data = await response.json();
      this.loading.classList.add("d-none");
      console.log("data", data);
      this.ui.displayDataGame(data);

      document.querySelectorAll(".card").forEach((card) =>
        card.addEventListener("click", () => {
          const gameId = card.dataset.id;
          this.details.classList.remove("d-none");
          this.games.classList.add("d-none");
          new Details(gameId, this.ui);
        })
      );
    } catch (error) {
      console.error("Failed to fetch games data:", error);
      return null;
    }
  }
}

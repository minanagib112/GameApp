export class Home {
  constructor() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        document
          .querySelector(".navbar-nav .active")
          .classList.remove("active");
        link.classList.add("active");
        const dataCategory = link.getAttribute("data-category");
        this.getGames(dataCategory);
      });
    });
  }

  async getGames(dataCategory) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "d2bc209edemsh6b3750149e60bd0p111a2ajsn0d4c93df5b71",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    let response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${dataCategory}`,
      options
    );

    let data = await response.json();
    console.log("data", data);
  }
}

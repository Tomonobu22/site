using Microsoft.AspNetCore.Mvc;
using PersonalPortfolio.Models;
using System.Text.Encodings.Web;

namespace PersonalPortfolio.Controllers
{
    public class ProjectsController : Controller
    {
        public IActionResult Index()
        {
            var projects = new List<Project>
            {
                new Project {
                    Title = "Weather App",
                    Description = "This is a simple react application to see the weather parameters in various parts of the world. You can see information such as temperature, humidity and wind speed. Try entering your city to see today's weather!",
                    ProjectUrl = "https://tomonobu22.github.io/WeatherReactApp/"
                },
                new Project { 
                    Title = "To-Do",
                    Description = "Classic task manager application. Here you can add or delete tasks. You can also mark tasks as done.",
                    ProjectUrl = "https://tomonobu22.github.io/react_todoList"
                },
                new Project {
                    Title = "Pacman Game",
                    Description = "The objective of the game is to eat all of the dots placed in the maze while avoiding four colored ghosts - Blinky (red), Pinky (pink), Inky (cyan), and Clyde (orange) - that pursue him. (Wikipedia)",
                    ProjectUrl = "/Projects/Pacman"
                }
            };

            return View(projects);
        }

        public IActionResult Welcome(string name, int numTimes = 1)
        {
            ViewData["Message"] = "Hello " + name;
            ViewData["NumTimes"] = numTimes;
            return View();
        }

        public IActionResult Pacman()
        {
            return View();
        }
    }
}

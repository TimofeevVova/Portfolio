using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Controllers
{
    public class ProjectsController : Controller
    {
        // секундомер
        public IActionResult StopWatch()
        {
            return PartialView("~/Views/Projects/MiniProjects/StopWatch.cshtml");
        }
        
        // игра угадай число
        public IActionResult FindTheNumber()
        {           
            return PartialView("~/Views/Projects/MiniProjects/FindTheNumber.cshtml");
        }

    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Controllers
{
    public class ProgectsController : Controller
    {
        // секундомер
        public IActionResult StopWatch()
        {
            return PartialView();
        }
        
        // игра угадай число
        public IActionResult FindTheNumber()
        {
            return PartialView();
        }

    }
}

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

        //основная часть работы с БД
        public IActionResult MainDBProgram()
        {
            return PartialView();
        }
        /*
        // Основная регистрация
        public IActionResult RegisterMainUser()
        {
            return PartialView();
        }
        */

        // добавить демо пользователя
        public IActionResult AddDemoUser()
        {
            return PartialView();
        }

        // открыть модально окно с выбором id демо пользователя
        public IActionResult ModalFormChangeDemoUser()
        {
            return PartialView();
        }
        // редактирование демо пользователя
        public IActionResult ChangeDemoUser()
        {
            return PartialView();
        }

        // удалить демо пользователя
        public IActionResult DeleteDemouser()
        {
            return PartialView();
        }
    }
}

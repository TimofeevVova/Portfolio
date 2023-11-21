using Microsoft.AspNetCore.Mvc;
using Portfolio.Helpers;
using Microsoft.EntityFrameworkCore;
using Portfolio.Models;


namespace Portfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataBaseController : Controller
    {
        private readonly DbHelper _dbHelper;        

        public DataBaseController(DbHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public class Data
        {
            public int System_Id { get; set; }
        }

        // Получение всех данных
        [HttpGet("getallusers")]
        public IActionResult GetAllUsers()
        {
            // Получаем все данные из таблицы InfoDataBase
            var users = _dbHelper.GetUsers();

            return Json(users);
        }

        // получение одного демо юзера
        [HttpGet("getuserbyid")]
        public IActionResult GetDemoUserById([FromQuery] Data model)
        {

            Console.WriteLine("Метод GetDemoUserById вызван с параметром System_Id: " + model.System_Id);


            var user = _dbHelper.GetDemoUserById(model.System_Id);

            return Json(user);
        }

        // проверка id пользователя
        [HttpGet("checkuser")]
        public IActionResult CheckUserExists([FromQuery] Data model)
        {
            Console.WriteLine("Метод DeleteDemoUser вызван с параметром System_Id: " + model.System_Id);
            bool userExists = _dbHelper.CheckUserExists(model.System_Id);
            return Ok(userExists);
        }

        // Добавление пользователя
        [HttpPost("adduser")]
        public IActionResult AddDemoUser([FromBody] InfoDataBase userData)
        {
            if (userData == null)
            {
                return BadRequest("Invalid data");
            }

            _dbHelper.AddDemoUser(userData);
            return Ok("User added successfully");
        }

        // изменение данных демо юзера
        [HttpPost("changeuserbyid")]
        public IActionResult ChangeUserById([FromBody] InfoDataBase userData)
        {
            if (userData == null)
            {
                return BadRequest("Invalid data");
            }

            int System_Id = userData.System_Id;

            _dbHelper.ChangeUserById(userData, System_Id);

            return Ok("User changed successfully");
        }

        // Удаление пользователя
        [HttpDelete("deleteuser")]
        public async Task<IActionResult> DeleteDemoUser()
        {
            using (StreamReader reader = new StreamReader(Request.Body))
            {
                var body = await reader.ReadToEndAsync();
                var values = body.Split('=');
                if (values.Length > 1)
                {
                    var System_Id = values[1];
                    Console.WriteLine("Метод DeleteDemoUser вызван с параметром System_Id: " + System_Id);
                    _dbHelper.DeleteDemoUser(Convert.ToInt32(System_Id));
                    return Ok("User deleted successfully");
                }
            }
            return BadRequest("Invalid request");
        }
    }
}


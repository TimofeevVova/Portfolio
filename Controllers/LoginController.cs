using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Helpers;
using Portfolio.Models;

namespace Portfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        
        private readonly LoginHelper _loginHelper;
        
        public LoginController(LoginHelper loginHelper)
        {
            _loginHelper = loginHelper;
        }
        public class LoginRequest
        {
            public string Login { get; set; }
            public string Password { get; set; }
            public string Company { get; set; }
            public string Name { get; set; }

        }


        [HttpGet("LoginPage")]
        public IActionResult LoginPage()
        {
            return View("~/Views/Projects/Login/LoginPage.cshtml");
        }

        [HttpGet("RegisterPage")]
        public IActionResult RegisterPage()
        {
            return View("~/Views/Projects/Login/RegisterPage.cshtml");
        }

        [HttpGet("MainPage")]
        public IActionResult MainPage()
        {
            return View("~/Views/Projects/Login/MainPage.cshtml");
        }



        //Вход
        [HttpPost("loginUser")]
        public IActionResult LoginUser([FromBody] LoginRequest request)
        {
            string login = request.Login;
            string password = request.Password;

            Console.WriteLine($"Received login: {login}, password: {password}");

            if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(password))
            {
                return BadRequest("Invalid login or password");
            }

            if (CheckLogin(login))
            {
                if (AuthenticateUser(login, password))
                {
                    return Ok("User found");
                }
                else
                {
                    return BadRequest("Invalid login or password");
                }
            }
            else
            {
                return NotFound("User not found");
            }
        }        

        //Проверка логина на наличие
        private bool CheckLogin(string login)
        {
            if (string.IsNullOrEmpty(login))
            {
                return false;
            }

            return _loginHelper.CheckLoginAvailability(login);
        }

        //Проверка логина и пароля
        private bool AuthenticateUser(string login, string password)
        {
            return _loginHelper.AuthenticateUser(login, password);
        }

        //Регистрация
        [HttpPost("registerNewUser")]
        public bool registerNewUser([FromBody] LoginRequest request)
        {
            string login = request.Login;
            string password = request.Password;
            string name = request.Name;
            string company = request.Company;


            if (!CheckLogin(login))
            {
                return _loginHelper.RegisterNewUser(login, name, password, company);
            }
            else
            {
                return false;
            }
                        
        }
    }
}

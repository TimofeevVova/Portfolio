using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Models;

namespace Portfolio.Helpers
{
    public class LoginHelper
    {
        private readonly DbSettings _dbSettings;

        public LoginHelper(DbSettings dbSettings)
        {
            _dbSettings = dbSettings;
        }
        
        //Регистрация нового пользователя
        public bool RegisterNewUser(string login, string name, string password, string company = null)
        {
            var newUser = new ClientDataBase
            {
                Name = name,
                Company = company,
                Login = login,
                Password = password // Добавить хеширование паролей
            };

            _dbSettings.ClientDataBase.Add(newUser);
            _dbSettings.SaveChanges();
            return true;
        }


        //Проверка логина
        public bool CheckLoginAvailability(string login)
        {
            return _dbSettings.ClientDataBase.Any(user => user.Login == login);
        }

        //Проверка пароля по логину
        public bool AuthenticateUser(string login, string password)
        {
            return _dbSettings.ClientDataBase.Any(user => user.Login == login && user.Password == password);
        }
        
    }
}

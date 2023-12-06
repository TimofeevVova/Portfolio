using Portfolio.Models;

namespace Portfolio.Helpers
{
    public class DbHelper
    {
        private readonly DbSettings _dbSettings;

        public DbHelper(DbSettings dbSettings)
        {
            _dbSettings = dbSettings;
        }

        // Получить все данные с таблицы
        public List<InfoDataBase> GetUsers()
        {
            return _dbSettings.InfoDataBases.ToList();
        }

        // получить данные одного юзера
        public InfoDataBase GetDemoUserById(int System_Id)
        {
            InfoDataBase user = _dbSettings.InfoDataBases.FirstOrDefault(x => x.System_Id == System_Id);

            return user;
        }

        // Проверить существование пользователя по id
        public bool CheckUserExists(int System_Id)
        {
            return _dbSettings.InfoDataBases.Any(user => user.System_Id == System_Id);
        }

        // Добавить юзера
        public void AddDemoUser(InfoDataBase userData)
        {
            var newUser = new InfoDataBase
            {
                FirstName = userData.FirstName,
                LastName = userData.LastName,
                DateOfBirth = userData.DateOfBirth,
                Sity = userData.Sity,
                PhoneNumber = userData.PhoneNumber,
                Email = userData.Email,
                Role = userData.Role,
                Salary = userData.Salary,
                Id = userData.Id
            };

            _dbSettings.InfoDataBases.Add(newUser);
            _dbSettings.SaveChanges();
        }              

        // редактировать демо юзера        
        public void ChangeUserById(InfoDataBase updatedUserData, int System_Id)
        {
            var existingUser = _dbSettings.InfoDataBases.FirstOrDefault(x => x.System_Id == System_Id);
            var changedUser = new InfoDataBase
            {
                FirstName = updatedUserData.FirstName,
                LastName = updatedUserData.LastName,
                DateOfBirth = updatedUserData.DateOfBirth,
                Sity = updatedUserData.Sity,
                PhoneNumber = updatedUserData.PhoneNumber,
                Email = updatedUserData.Email,
                Role = updatedUserData.Role,
                Salary = updatedUserData.Salary,
                Id = updatedUserData.Id
            };
            
            existingUser.FirstName = changedUser.FirstName;
            existingUser.LastName = changedUser.LastName;
            existingUser.DateOfBirth = changedUser.DateOfBirth;
            existingUser.Sity = changedUser.Sity;
            existingUser.PhoneNumber = changedUser.PhoneNumber;
            existingUser.Email = changedUser.Email;
            existingUser.Role = changedUser.Role;
            existingUser.Salary = changedUser.Salary;
            existingUser.Id = changedUser.Id;
                                    
            _dbSettings.SaveChanges();
        }

        // Удалить пользователя
        public void DeleteDemoUser(int System_Id)
        {
            var userToDelete = _dbSettings.InfoDataBases.FirstOrDefault(user => user.System_Id == System_Id);

            if (userToDelete != null)
            {
                Console.WriteLine("Удаляем пользователя с System_Id: " + System_Id);
                _dbSettings.InfoDataBases.Remove(userToDelete);
                _dbSettings.SaveChanges();

            }
        }
    }
}

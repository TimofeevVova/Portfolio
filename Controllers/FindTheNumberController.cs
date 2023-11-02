using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Controllers
{
    public class FindTheNumberController : Controller
    {
        private static int[]? _number;

        // создание числа
        [HttpPost]
        public int[]? GenerateNumber()
        {
            _number = null;
            List<int> part = new List<int> { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
            Random random = new Random();

            // Перемешиваем список
            for (int i = part.Count - 1; i > 0; i--)
            {
                int j = random.Next(0, i + 1);
                int temp = part[i];
                part[i] = part[j];
                part[j] = temp;
            }

            // Берем первые четыре цифры
            _number = new int[] { part[0], part[1], part[2], part[3] };

            return _number;
        }

        // проверка числа
        [HttpGet]
        public int[] checkNumbers([FromQuery] int userNumber)
        {
            // первое число - количество верных цифр
            // второе число - количество цифр на своем месте
            int[] answer = { 0, 0 };

            // Разбиваем число на отдельные цифры
            int[] userDigits = new int[4];
            for (int i = 3; i >= 0; i--)
            {
                userDigits[i] = userNumber % 10;
                userNumber /= 10;
            }
            // проверка на совпадения
            for (int i = 0; i < 4; i++)
            {
                for (int j = 0; j < 4; j++)
                {
                    if (userDigits[i] == _number[j])
                    {
                        answer[0] += 1;

                        // Если цифра находится на своем месте
                        if (i == j)
                        {
                            answer[1] += 1;
                        }
                    }
                }
            }

            return answer;
        }

    }
}

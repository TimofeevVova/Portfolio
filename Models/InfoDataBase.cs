using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Models
{
    [Table("db")]
    public class InfoDataBase  
    {
        // [Required]  представляет аннотацию, которая указывает, что свойство name обязательно должно иметь значение.
        // [JsonIgnore] - ???

        [Key]
        [Required]
        [Column("id")]
        public int System_Id { get; set; }

        [Required]
        [Column("first_name")]
        public string FirstName { get; set; }
                
        [Column("last_name")]
        public string LastName { get; set; }

        [Required]
        [Column("date_of_birth", TypeName = "date")]
        public DateTime DateOfBirth { get; set; }

        [Column("city")]
        public string Sity { get; set; }
               
        [Column("phone")]
        public int PhoneNumber { get; set; }
               
        [Column("email")]
        public string Email { get; set; }

        [Required]
        [Column("role")]
        public string Role { get; set; }

        [Required]
        [Column("salary")]
        public int Salary { get; set; }

        [Required]
        [Column("private_id")]
        public int Id { get; set; }
    }            
}

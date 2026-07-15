using ExpenseLibrary.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpenseLibrary.Service
{
    public interface IAuthServices
    {
        public bool AddUser(User user);
        public bool UpdateUser(User user);
        public bool DeleteUser(User user);
        public User Login(string phone, string password);

    }
}

using ExpenseLibrary.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpenseLibrary.Service
{
    public interface IJwtService
    {
        public string GenerateToken(User user);
    }
}

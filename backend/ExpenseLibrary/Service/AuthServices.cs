using ExpenseLibrary.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpenseLibrary.Service
{
    public class AuthServices : IAuthServices
    {
        private readonly ServiceContext _context;
        public AuthServices(ServiceContext context)
        {
            _context = context;
        }
        public bool UpdateUser(User user)
        {
            User u = _context.Users.Find(user.UserId);
            if (u == null)
            {
                return false;
            }
            u.Name = user.Name;
            return _context.SaveChanges() > 0;
        }
        public bool AddUser(User user)
        {
            User u = _context.Users.FirstOrDefault(x => x.Phone == user.Phone);
            if (u != null)
            {
                return false;
            }
            var passwordHasher = new PasswordHasher<User>();
            user.Password = passwordHasher.HashPassword(user, user.Password);
            _context.Users.Add(user);
            return _context.SaveChanges() > 0;
        }
        public bool DeleteUser(User user)
        {
            User u = _context.Users.FirstOrDefault(x => x.Phone == user.Phone);
            if (u == null)
            {
                return false;
            }
            _context.Users.Remove(u);
            return _context.SaveChanges() > 0;
        }
        public User Login(string phone, string password)
        {
            var passwordHasher = new PasswordHasher<User>();

            User u = _context.Users.FirstOrDefault(x => x.Phone == phone);
            if (u == null)
            {
                return null;
            }
            string p = u.Password;
            var result = passwordHasher.VerifyHashedPassword(u, p, password);
            if (result == PasswordVerificationResult.Failed)
            {
                return null;
            }
            return u;
        }
    }
}

using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Kongres.Api.Infrastructure.Identity
{
    public class UserStore : IUserRoleStore<User>, IUserPasswordStore<User>, IUserEmailStore<User>
    {
        private readonly KongresDbContext _context;

        public UserStore(KongresDbContext context)
        {
            _context = context;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context?.Dispose();
            }
        }

        #region IUserStore
        public Task<string> GetUserIdAsync(User user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.Id.ToString());
        }

        public Task<string> GetUserNameAsync(User user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.UserName);
        }

        public Task SetUserNameAsync(User user, string userName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.UserName = userName;

            return Task.CompletedTask;
        }

        public Task<string> GetNormalizedUserNameAsync(User user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.NormalizedUserName);
        }

        public Task SetNormalizedUserNameAsync(User user, string normalizedUserName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.NormalizedUserName = normalizedUserName;

            return Task.CompletedTask;
        }

        public async Task<IdentityResult> CreateAsync(User user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            await _context.Users.AddAsync(user, cancellationToken);

            var affectedRows = await _context.SaveChangesAsync(cancellationToken);
            return affectedRows > 0
                ? IdentityResult.Success
                : IdentityResult.Failed(new IdentityError { Description = $"Could not create user {user.UserName}." });
        }

        public async Task<IdentityResult> UpdateAsync(User user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            _context.Users.Update(user);

            var affectedRows = await _context.SaveChangesAsync(cancellationToken);
            return affectedRows > 0
                ? IdentityResult.Success
                : IdentityResult.Failed(new IdentityError { Description = $"Could not update user {user.UserName}." });
        }

        public async Task<IdentityResult> DeleteAsync(User user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            _context.Users.Remove(user);

            var affectedRows = await _context.SaveChangesAsync(cancellationToken);
            return affectedRows > 0
                ? IdentityResult.Success
                : IdentityResult.Failed(new IdentityError { Description = $"Could not delete user {user.UserName}." });
        }

        public async Task<User> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (uint.TryParse(userId, out uint id))
            {
                return await _context.Users.FindAsync(id);
            }

            return await Task.FromResult((User)null);
        }

        public async Task<User> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            return await _context.Users.SingleOrDefaultAsync(
                x => x.NormalizedUserName == normalizedUserName, cancellationToken);
        }
        #endregion

        #region IUserPasswordStore
        public Task SetPasswordHashAsync(User user, string passwordHash, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.PasswordHash = passwordHash;

            return Task.CompletedTask;
        }

        public Task<string> GetPasswordHashAsync(User user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.PasswordHash);
        }

        public Task<bool> HasPasswordAsync(User user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(!string.IsNullOrWhiteSpace(user.PasswordHash));
        }
        #endregion

        #region IUserRoleStore
        public async Task AddToRoleAsync(User user, string roleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var isInRole = await IsInRoleAsync(user, roleName, cancellationToken);

            if (!isInRole)
            {
                var role = await _context.Roles.SingleOrDefaultAsync(
                    x => x.Name == roleName, cancellationToken);
                var userRole = new UserRole()
                {
                    Role = role,
                    User = user
                };

                await _context.UserRoles.AddAsync(userRole, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }

        public async Task RemoveFromRoleAsync(User user, string roleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var userRole = await _context.UserRoles.SingleOrDefaultAsync(
                x => x.User.Id == user.Id && x.Role.Name == roleName, cancellationToken);

            _context.UserRoles.Remove(userRole);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<IList<string>> GetRolesAsync(User user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return await _context.UserRoles.Where(x => x.User.Id == user.Id)
                                           .Select(x => x.Role.Name)
                                           .ToListAsync(cancellationToken);
        }

        public Task<bool> IsInRoleAsync(User user, string roleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(_context.UserRoles.Any(
                x => x.User.Id == user.Id && x.Role.Name == roleName));
        }

        public async Task<IList<User>> GetUsersInRoleAsync(string roleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            return await _context.UserRoles.Where(x => x.Role.Name == roleName)
                                           .Select(x => x.User)
                                           .ToListAsync(cancellationToken);
        }
        #endregion

        #region IUserEmailStore
        // In application users can have same email: 
        // for participant and reviewer 
        // so there is no something like unique email :C
        public Task<User> FindByEmailAsync(string normalizedEmail, CancellationToken cancellationToken)
            => throw new NotImplementedException();

        public Task<string> GetEmailAsync(User user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.Email);
        }

        public Task<bool> GetEmailConfirmedAsync(User user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.IsEmailConfirmed);
        }

        public Task<string> GetNormalizedEmailAsync(User user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.NormalizedEmail);
        }

        public Task SetEmailAsync(User user, string email, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.Email = email;

            return Task.CompletedTask;
        }

        public Task SetEmailConfirmedAsync(User user, bool confirmed, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.IsEmailConfirmed = confirmed;

            return Task.CompletedTask;
        }

        public Task SetNormalizedEmailAsync(User user, string normalizedEmail, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.NormalizedEmail = normalizedEmail;

            return Task.CompletedTask;
        }
        #endregion
    }
}
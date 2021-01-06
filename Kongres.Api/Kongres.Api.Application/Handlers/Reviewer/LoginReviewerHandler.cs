﻿using System;
using System.Threading;
using System.Threading.Tasks;
using Kongres.Api.Application.Commands.Reviewer;
using Kongres.Api.Application.Services;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Kongres.Api.Application.Handlers.Reviewer
{
    public class LoginReviewerHandler : AsyncRequestHandler<LoginReviewerCommand>
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJwtHandler _jwtHandler;

        public LoginReviewerHandler(UserManager<User> userManager, SignInManager<User> signInManager, IJwtHandler jwtHandler)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtHandler = jwtHandler;
        }

        protected override async Task Handle(LoginReviewerCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var userName = $"{nameof(UserTypeEnum.Reviewer)}:{request.Email}";

            var user = await _userManager.FindByNameAsync(userName);

            if (user is null)
            {
                throw new Exception("Invalid credentials");
            }

            var result = await _signInManager.PasswordSignInAsync(user, request.Password, false, false);
            if (result.Succeeded)
            {
                // return login/JWT token
                var jwtToken = _jwtHandler.CreateToken(user.Id, UserTypeEnum.Participant.ToString());
            }
        }
    }
}

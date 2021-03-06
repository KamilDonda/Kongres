﻿using MediatR;
using Microsoft.AspNetCore.Http;

namespace Kongres.Api.Application.Commands.Work
{
    public class AddWorkCommand : IRequest<uint>
    {
        public string AuthorId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Authors { get; set; }
        public IFormFile Work { get; set; }
        public string Specialization { get; set; }
    }
}

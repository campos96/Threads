using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Net;

namespace Threads.Api
{
    public class ApiResult
    {
        public static BadRequestObjectResult BadRequest(string? title = null, object? errors = null)
        {
            return new BadRequestObjectResult(new Response
            {
                Status = StatusCodes.Status400BadRequest,
                Title = title ?? "BadRequest",
                Errors = errors
            });
        }

        public static NotFoundObjectResult NotFound(string? title = null, object? errors = null)
        {
            return new NotFoundObjectResult(new Response
            {
                Status = StatusCodes.Status404NotFound,
                Title = title ?? "NotFound",
                Errors = errors
            });
        }

        public static OkObjectResult Ok(string? title = null, object? payload = null)
        {
            return new OkObjectResult(new Response
            {
                Status = StatusCodes.Status200OK,
                Title = title ?? "Ok",
                Payload = payload
            });
        }

        public static UnauthorizedObjectResult Unauthorized(string? title = null, object? errors = null)
        {
            return new UnauthorizedObjectResult(new Response
            {
                Status = StatusCodes.Status401Unauthorized,
                Title = title ?? "Unauthorized",
                Errors = errors
            });
        }
    }

    class Response
    {
        public int Status { get; set; }
        public string Title { get; set; }
        public object? Errors { get; set; }

        public object? Payload { get; set; }
    }
}

using System;
using System.Net;

namespace Application.Errors
{
    public class RestException : Exception
    {
        public HttpStatusCode Code { get; }
        public object Error { get; }
        public RestException(HttpStatusCode code, object error = null)
        {
            this.Error = error;
            this.Code = code;
        }
    }
}
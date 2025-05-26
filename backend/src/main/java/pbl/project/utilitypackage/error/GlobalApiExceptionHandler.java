package pbl.project.utilitypackage.error;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import pbl.project.utilitypackage.dto.response.CustomApiResponse;
import pbl.project.utilitypackage.dto.response.CustomErrorResponse;

import javax.security.sasl.AuthenticationException;

@RestControllerAdvice
public class GlobalApiExceptionHandler
{
    // 404 Not Found 예외 처리
    @ExceptionHandler({NoResourceFoundException.class, NoHandlerFoundException.class})
    public ModelAndView handleNotFoundException()
    {
        return new ModelAndView("redirect:/admin/404");
    }

    @ExceptionHandler(CustomException.class)
    public CustomApiResponse<CustomErrorResponse> handleCustomErrorResponseException(CustomException ex)
    {
        CustomErrorResponse customErrorResponse = CustomErrorResponse.of("400", ex.getMessage());

        return CustomApiResponse.ERROR(customErrorResponse);
    }

    @ExceptionHandler(AuthenticationException.class)
    public CustomApiResponse<CustomErrorResponse> handleAuthErrorResponseException(CustomException ex)
    {
        CustomErrorResponse customErrorResponse = CustomErrorResponse.of("401", ex.getMessage());

        return CustomApiResponse.ERROR(customErrorResponse);
    }

    // 모든 기타 API 예외 처리
    @ExceptionHandler(Exception.class)
    public CustomApiResponse<CustomErrorResponse> handleGlobalApiException(Exception ex)
    {
        CustomErrorResponse customErrorResponse = CustomErrorResponse.of("500", ex.getMessage());

        return CustomApiResponse.ERROR(customErrorResponse);
    }
}

package pbl.project.utilitypackage.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.NoHandlerFoundException;

//@ControllerAdvice
public class GlobalWebExceptionHandler
{
    // 404 Not Found 예외 처리
    @ExceptionHandler(NoHandlerFoundException.class)
    public ModelAndView handleNotFoundException(NoHandlerFoundException ex)
    {
        ModelAndView modelAndView = new ModelAndView("common/error/404");  // common/error/404 로 이동
        modelAndView.setStatus(HttpStatus.NOT_FOUND);
        modelAndView.addObject("message", "페이지를 찾을 수 없습니다.");
        return modelAndView;
    }
}
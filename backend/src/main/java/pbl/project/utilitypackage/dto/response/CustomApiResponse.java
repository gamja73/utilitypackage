package pbl.project.utilitypackage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomApiResponse<T>
{
    private final Boolean success;
    private final Integer statusCode;
    private final T data;

    // 성공 응답 (데이터 없음)
    public static <T> CustomApiResponse<T> OK()
    {
        return new CustomApiResponse<>(true, 200, null);
    }

    // 성공 응답 (데이터 있음)
    public static <T> CustomApiResponse<T> OK(T data)
    {
        return new CustomApiResponse<>(true, 200, data);
    }

    // 오류 응답
    public static <T> CustomApiResponse<T> ERROR(CustomErrorResponse error)
    {
        return new CustomApiResponse<>(false, Integer.parseInt(error.getCode()), (T) error.getMessage());
    }

    // 오류 응답
    public static CustomApiResponse<String> ERROR(Integer errorCode, String errorMessage)
    {
        return new CustomApiResponse<>(false, errorCode, errorMessage);
    }
}

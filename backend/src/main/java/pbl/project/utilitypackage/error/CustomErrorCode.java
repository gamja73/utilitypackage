package pbl.project.utilitypackage.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CustomErrorCode
{
    ;

    private final String errorCode;
    private final String errorMessage;
}

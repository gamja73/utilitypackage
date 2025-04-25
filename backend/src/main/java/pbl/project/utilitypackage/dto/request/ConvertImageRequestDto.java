package pbl.project.utilitypackage.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ConvertImageRequestDto
{
    private MultipartFile image;
    private String format;
    private int width;
    private int height;
}

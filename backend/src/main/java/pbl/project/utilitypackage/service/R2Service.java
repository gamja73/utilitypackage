package pbl.project.utilitypackage.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@Service
public class R2Service
{
    @Autowired
    private AmazonS3 r2Client;

    @Value("${R2-config.bucketName}")
    private String bucketName;

    private static final List<String> SUPPORTED_FORMATS = Arrays.asList("jpg", "jpeg", "png", "webp", "bmp", "tiff", "avif");

    // R2에 이미지 업로드
    public String uploadImage(MultipartFile file)
    {
        try
        {
            // 파일 형식 검증
            String fileExtension = getFileExtension(file);

            if (!SUPPORTED_FORMATS.contains(fileExtension))
            {
                throw new RuntimeException("Unsupported file format: " + fileExtension);
            }

            String newFileName = generateUniqueFileName();

            String originalKeyName = "origin/" + newFileName + "." + fileExtension;
            InputStream originalInputStream = file.getInputStream();

            return uploadFileToR2(originalInputStream, originalKeyName, file.getSize(), file.getContentType());
        }
        catch (Exception e)
        {
            throw new RuntimeException("Error uploading image: " + e.getMessage());
        }
    }

    // R2에 이미지 업로드 (origin, Webp 변환 파일)
    public String uploadWebpImage(MultipartFile file)
    {
        try
        {
            // 파일 형식 검증
            String fileExtension = getFileExtension(file);

            if (!SUPPORTED_FORMATS.contains(fileExtension))
            {
                throw new RuntimeException("Unsupported file format: " + fileExtension);
            }

            String newFileName = generateUniqueFileName();

            // Webp 형식으로 변환된 파일 업로드 (img 디렉토리에 저장)
            byte[] webpBytes = convertToWebp(file);
            String webpKeyName = "img/" + newFileName + ".webp";
            InputStream webpInputStream = new ByteArrayInputStream(webpBytes);

            // 변환된 파일의 URL 반환
            return uploadFileToR2(webpInputStream, webpKeyName, webpBytes.length, "image/webp");
        }
        catch (Exception e)
        {
            throw new RuntimeException("Error uploading image: " + e.getMessage());
        }
    }

    // 파일을 R2에 업로드
    private String uploadFileToR2(InputStream inputStream, String keyName, long contentLength, String contentType)
    {
        try
        {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(contentLength);
            metadata.setContentType(contentType);

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, keyName, inputStream, metadata);
            r2Client.putObject(putObjectRequest);

            // 업로드 성공 후 S3 URL 반환
            return r2Client.getUrl(bucketName, keyName).toString();
        }
        catch (Exception e)
        {
            throw new RuntimeException("Error uploading file to R2: " + e.getMessage());
        }
    }

    // 이미지 파일 -> Webp 로 변환
    private byte[] convertToWebp(MultipartFile file) throws IOException
    {
        BufferedImage image = ImageIO.read(file.getInputStream());

        ByteArrayOutputStream webpStream = new ByteArrayOutputStream();
        try (ImageOutputStream imageOutputStream = ImageIO.createImageOutputStream(webpStream))
        {
            ImageIO.write(image, "webp", imageOutputStream);
        }

        // 변환된 Webp 파일의 바이트 배열
        return webpStream.toByteArray();
    }

    // 파일 확장자 추출
    private String getFileExtension(MultipartFile file)
    {
        String filename = file.getOriginalFilename();

        if (filename != null && filename.lastIndexOf('.') > 0)
        {
            return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
        }

        return "";
    }

    private String generateUniqueFileName()
    {
        LocalDateTime now = LocalDateTime.now();

        String date = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        Long timestamp = now.toInstant(ZoneOffset.UTC).toEpochMilli();

        return date + "-" + timestamp;
    }
}
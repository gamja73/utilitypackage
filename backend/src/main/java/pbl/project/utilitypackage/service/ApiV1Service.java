package pbl.project.utilitypackage.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bytedeco.javacv.FFmpegFrameGrabber;
import org.bytedeco.javacv.FFmpegFrameRecorder;
import org.bytedeco.javacv.Frame;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import pbl.project.utilitypackage.dto.request.ConvertImageRequestDto;

import java.io.*;
import java.net.Socket;
import java.nio.file.Files;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApiV1Service
{
    private final R2Service r2Service;

    public String convertImage(ConvertImageRequestDto request)
    {
        try
        {
            String inputFileName = UUID.randomUUID() + "_" + request.getImage().getOriginalFilename();
            File inputFile = new File(System.getProperty("java.io.tmpdir"), inputFileName);
            request.getImage().transferTo(inputFile);

            String outputFileName = UUID.randomUUID() + "_output." + request.getFormat();
            File outputFile = new File(System.getProperty("java.io.tmpdir"), outputFileName);

            // JavaCV로 이미지 변환
            try (FFmpegFrameGrabber grabber = new FFmpegFrameGrabber(inputFile)) {
                grabber.start();

                try (FFmpegFrameRecorder recorder = new FFmpegFrameRecorder(outputFile, request.getWidth(), request.getHeight())) {
                    recorder.setFormat(request.getFormat());
                    recorder.setFrameRate(grabber.getFrameRate());

                    recorder.start();

                    Frame frame;
                    while ((frame = grabber.grabImage()) != null) {
                        recorder.record(frame);
                    }

                    recorder.stop();
                }

                grabber.stop();
            }

            byte[] outputBytes = Files.readAllBytes(outputFile.toPath());
            MultipartFile convertedImage = new MockMultipartFile(
                    "file",
                    outputFile.getName(),
                    "image/" + request.getFormat(),
                    outputBytes
            );

            inputFile.delete();
            outputFile.delete();

            return r2Service.uploadImage(convertedImage);
        }
        catch (Exception e)
        {
            log.error(e.getMessage());
        }

        return null;
    }

    public String upscaleImage(MultipartFile image)
    {
        try
        {
            ByteArrayResource resource = new ByteArrayResource(image.getBytes()) {
                @Override
                public String getFilename() {
                    return image.getOriginalFilename();
                }
            };

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", resource);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            String fastApiUrl = "http://127.0.0.1:8000/upscale";

            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<byte[]> response = restTemplate.exchange(
                    fastApiUrl,
                    HttpMethod.POST,
                    requestEntity,
                    byte[].class
            );

            if (response.getStatusCode() != HttpStatus.OK) {
                throw new RuntimeException("FastAPI 서버 요청 실패: " + response.getStatusCode());
            }

            byte[] upscaledImageBytes = response.getBody();

            MultipartFile upscaledMultipartFile = new MockMultipartFile(
                    "file",
                    "upscaled.png",
                    "image/png",
                    upscaledImageBytes
            );

            return r2Service.uploadWebpImage(upscaledMultipartFile);
        }
        catch (Exception e)
        {
            log.error(e.getMessage());
        }

        return null;
    }

    public String getDomainInfo(String domain)
    {
        return queryDomainInfo(domain, "whois.kr");
    }

    private String queryDomainInfo(String domain, String server)
    {
        try (Socket socket = new Socket(server, 43);
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
             BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {

            out.println(domain);
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = in.readLine()) != null) {
                response.append(line).append("\n");
            }
            return response.toString();
        }
        catch (IOException e)
        {
            return e.getMessage();
        }
    }
}

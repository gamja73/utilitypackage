package pbl.project.utilitypackage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import pbl.project.utilitypackage.dto.request.ConvertImageRequestDto;
import pbl.project.utilitypackage.service.R2Service;
import pbl.project.utilitypackage.service.StringUtilService;

import org.bytedeco.javacv.FFmpegFrameGrabber;
import org.bytedeco.javacv.FFmpegFrameRecorder;
import org.bytedeco.javacv.Frame;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ApiV1Controller
{
    private final StringUtilService stringUtilService;
    private final R2Service r2Service;

    private final RestTemplate restTemplate = new RestTemplate();

    @ResponseBody
    @PostMapping("/string/encode")
    public String stringEncoding(String input, String type)
    {
        return stringUtilService.stringEncoding(input, type);
    }

    @ResponseBody
    @PostMapping("/string/decode")
    public String stringDecoding(String input, String type)
    {
        return stringUtilService.stringDecoding(input, type);
    }

    @PostMapping("/image/convert")
    public String convertImage(ConvertImageRequestDto requestDto) throws IOException
    {
        String inputFileName = UUID.randomUUID() + "_" + requestDto.getImage().getOriginalFilename();
        File inputFile = new File(System.getProperty("java.io.tmpdir"), inputFileName);
        requestDto.getImage().transferTo(inputFile);

        String outputFileName = UUID.randomUUID() + "_output." + requestDto.getFormat();
        File outputFile = new File(System.getProperty("java.io.tmpdir"), outputFileName);

        // JavaCV로 이미지 변환
        try (FFmpegFrameGrabber grabber = new FFmpegFrameGrabber(inputFile)) {
            grabber.start();

            try (FFmpegFrameRecorder recorder = new FFmpegFrameRecorder(outputFile, requestDto.getWidth(), requestDto.getHeight())) {
                recorder.setFormat(requestDto.getFormat());
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
                "image/" + requestDto.getFormat(),
                outputBytes
        );

        inputFile.delete();
        outputFile.delete();

        return r2Service.uploadImage(convertedImage)
                .replace("https://utility-package.c232a8ee107f5931fedcc96b97b9bb02.r2.cloudflarestorage.com","https://pub-6592e4b90d1541b39d2ddca5820237b3.r2.dev");
    }

    @PostMapping("/image/upscale")
    public String upscaleImage(@RequestParam("image") MultipartFile image) throws IOException
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

        return r2Service.uploadWebpImage(upscaledMultipartFile).replace("https://utility-package.c232a8ee107f5931fedcc96b97b9bb02.r2.cloudflarestorage.com","https://pub-6592e4b90d1541b39d2ddca5820237b3.r2.dev");
    }

}

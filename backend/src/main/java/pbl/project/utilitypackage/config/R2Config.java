package pbl.project.utilitypackage.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
public class R2Config
{
    @Value("${R2-config.bucketName}")
    private String r2BucketName;

    @Value("${R2-config.back.endpointUrl}")
    private String r2EndpointUrl;

    @Value("${R2-config.back.region}")
    private String r2Region;

    @Value("${R2-config.back.accessKey}")
    private String r2AccessKey;

    @Value("${R2-config.back.secretKey}")
    private String r2SecretKey;

    @Bean
    public AmazonS3 r2Client()
    {
        BasicAWSCredentials r2Credentials = new BasicAWSCredentials(r2AccessKey, r2SecretKey);

        return AmazonS3ClientBuilder
                .standard()
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(r2EndpointUrl, r2Region))
                .withCredentials(new AWSStaticCredentialsProvider(r2Credentials))
                .build();
    }
}

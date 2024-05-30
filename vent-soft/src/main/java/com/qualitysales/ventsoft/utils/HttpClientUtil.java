package com.qualitysales.ventsoft.utils;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

@Component
public class HttpClientUtil {

    private final HttpClient httpClient;

    public HttpClientUtil() {
        this.httpClient = HttpClient.newHttpClient();
    }

    public String sendGetRequest(String baseUrl, String name, String lastName) throws IOException, InterruptedException, URISyntaxException {
        String encodedName = URLEncoder.encode(name, StandardCharsets.UTF_8);
        String encodedLastName = URLEncoder.encode(lastName, StandardCharsets.UTF_8);

        String fullUrl = (baseUrl + "?name=" + encodedName + "&lastName=" + encodedLastName);
        URI uri = new URI(fullUrl);

        System.out.println("uri = " + uri);

        HttpRequest request = HttpRequest.newBuilder(uri).GET().build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

}

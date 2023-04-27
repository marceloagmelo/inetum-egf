package pt.egf.api.application.util.api;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import kong.unirest.HttpResponse;
import kong.unirest.Unirest;
import org.osgi.service.component.annotations.Component;


@Component(
        immediate = true,
        service = SimpleFlowApi.class
)
public class SimpleFlowApi {

    private static final Log _log = LogFactoryUtil.getLog(SimpleFlowApi.class);

    private final String API_HOST = "https://70076c9a-512e-44e7-b159-57e3b5f32256.mock.pstmn.io";

    private String getApiHost() {
        return API_HOST;
    }

    public String callService(String auth, String path, String json) {

        HttpResponse<String> response = Unirest.get(getApiHost() + path)
                .header("Content-Type", "application/json")
                .asString();

        if(response.getStatus() == 200) {
            return response.getBody().toString();
        } else {
            return null;
        }
    }
}

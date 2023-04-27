package pt.egf.api.application;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.jaxrs.whiteboard.JaxrsWhiteboardConstants;
import pt.egf.api.application.domain.ApiError;
import pt.egf.api.application.model.Categoria;
import pt.egf.api.application.service.CategoriaService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.List;
import java.util.Set;

/**
 * @author marcelomelo
 */
@Component(
	property = {
		JaxrsWhiteboardConstants.JAX_RS_APPLICATION_BASE + "=/v1/egf",
		JaxrsWhiteboardConstants.JAX_RS_NAME + "=EgfApi.Rest"
	},
	service = Application.class
)
public class EgfApiApplication extends Application {

	@Reference
	protected CategoriaService categoriaService;

	public Set<Object> getSingletons() {
		return Collections.<Object>singleton(this);
	}

	@GET
	@Path("/categorias")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCategorias() {
		List<Categoria> lista = categoriaService.getCategorias();

		if (null != lista) {
			return Response.ok(lista).build();
		} else {
			ApiError erro = new ApiError(String.valueOf(Response.status(Response.Status.NOT_FOUND).build().getStatus()), "Lista vazia!");
			return Response.status(Response.Status.NOT_FOUND).entity(erro).build();
		}

	}

}
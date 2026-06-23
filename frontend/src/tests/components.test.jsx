import { fireEvent, render, screen } from "@testing-library/react";
import Button from "@components/Button";
import Input from "@components/Input";
import Footer from "@components/Footer";
import ModalDestino from "@components/ModalDestino";
import { ItinerarioContext } from "@components/ItinerarioContext";
import Contacto from "@pages/Contacto";

describe("Componentes reutilizables", () => {
  test("Button muestra el texto recibido", () => {
    render(<Button>Continuar</Button>);
    expect(screen.getByRole("button", { name: "Continuar" })).toBeInTheDocument();
  });

  test("Button ejecuta la función del click", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Guardar</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("Modal obliga a recalcular cuando cambian los días", () => {
    const destino = {
      nombre: "Tokio",
      galeria: ["imagenes/destinos/tokio.jpg"],
      precioDia: 100,
      historia: "Historia",
      atracciones: "Atracciones",
      duracion: "5",
      temporada: "Primavera",
    };

    render(
      <ItinerarioContext.Provider value={{ guardarReserva: jest.fn() }}>
        <ModalDestino destino={destino} onCerrar={() => {}} />
      </ItinerarioContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("Fecha de inicio"), {
      target: { value: "2099-01-01" },
    });
    fireEvent.change(screen.getByLabelText("Días"), { target: { value: "2" } });
    fireEvent.click(screen.getByRole("button", { name: "Calcular costo" }));

    expect(screen.getByText("Costo estimado: USD 200")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Guardar en Itinerario" })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Días"), { target: { value: "3" } });

    expect(screen.queryByText("Costo estimado: USD 200")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Guardar en Itinerario" })
    ).not.toBeInTheDocument();
  });

  test("Input relaciona el label con el campo", () => {
    render(<Input id="nombre" label="Nombre" value="" onChange={() => {}} />);
    expect(screen.getByLabelText("Nombre")).toHaveAttribute("id", "nombre");
  });

  test("Input relaciona un error con aria-describedby", () => {
    render(
      <Input
        id="email"
        label="Email"
        value="invalido"
        onChange={() => {}}
        error="Correo inválido"
      />
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-describedby", "email-error");
    expect(screen.getByRole("alert")).toHaveTextContent("Correo inválido");
  });

  test("Footer muestra el año actual", () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  test("Contacto valida el nombre durante onChange", () => {
    render(<Contacto />);
    fireEvent.change(screen.getByLabelText("Nombre:"), { target: { value: "1" } });
    expect(screen.getByRole("alert")).toHaveTextContent(
      "El nombre debe tener solo letras y espacios"
    );
  });
});

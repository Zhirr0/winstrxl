import ClientNamesCards from "../../components/ClientNamesCards";
import ClientNamesHeader from "../../components/ClientNamesHeader";

export default function ClientNames() {
  return (
    <section className="cl-names">
      <ClientNamesHeader />
      <ClientNamesCards />
    </section>
  );
}

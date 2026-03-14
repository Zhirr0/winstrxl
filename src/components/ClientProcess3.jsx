import { useMediaQuery } from "react-responsive";

export default function ClientProcess3() {
  const breakpoint = useMediaQuery({ maxWidth: 768 });
  return (
    <div
      style={{ padding: breakpoint ? "20px" : "30px" }}
      className="cl-process-card absolute inset-0 cl-process-card-3 z-20"
    >
      <div className="cl-card-header">
        <h1>Client Card Header</h1>
        <h1>03</h1>
      </div>
      <div className="cl-card-center">
        <div
          className="h-0.5 w-full "
          style={{
            background: "linear-gradient(90deg, rgba(0,0,0, 0.5), transparent)",
          }}
        />{" "}
      </div>
      <div className="cl-card-bottom">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
          voluptatibus quasi unde eligendi! Modi, velit. Ipsa impedit accusamus
          vel corrupti natus minus cupiditate eaque dolores, iste praesentium
          aut necessitatibus modi! Et, sapiente? Ab nesciunt nobis optio ea
          mollitia, nihil ipsum quam nulla eligendi, expedita deleniti hic
          explicabo culpa animi quae?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          nisi tempora eum optio debitis? At dolorum perspiciatis illum.
          Voluptatibus officia quis illum nemo accusamus odio assumenda
          cupiditate natus consectetur, eos dolores commodi nisi explicabo
          repudiandae earum laborum eaque! Odio, quaerat. Praesentium numquam
          quos sapiente quae delectus dignissimos autem similique suscipit quia
          ea consectetur laudantium quasi excepturi, corrupti blanditiis, odio
          deleniti sunt ducimus. Odit quia, vero in quo aspernatur nemo
          dignissimos corrupti hic, repellat dolorem, illo veniam labore eaque
          voluptatem magni voluptatum accusamus et maiores perspiciatis rem
          cupiditate. Consequatur inventore exercitationem perspiciatis sequi
          molestiae nam eos deserunt corrupti, voluptate ex aperiam.
        </p>
      </div>{" "}
    </div>
  );
}

import { useRouter } from "next/router";
import Product from "./Product";
import Scrolltotop from "./Scrolltotop";
import classNames from "classnames";
function ProductFeed({ products }) {
  return (
    <div className="relative ">
      <div className="grid grid-flow-row-dense md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  md:-mt-52 mx-auto">
        {products
          .slice(0, 4)
          .map(({ id, title, price, image, category, description }, i) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              image={image}
              description={description}
              category={category}
            />
          ))}

        <img
          className="md:col-span-full "
          src="https://links.papareact.com/dyz"
          alt=""
        />
        <div className="md:col-span-2 ">
          {products
            .slice(4, 5)
            .map(({ id, title, price, image, category, description }) => (
              <Product
                key={id}
                id={id}
                title={title}
                price={price}
                image={image}
                description={description}
                category={category}
              />
            ))}
        </div>

        {products
          .slice(5, products.length)
          .map(({ id, title, price, image, category, description }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              image={image}
              description={description}
              category={category}
            />
          ))}
      </div>
      <Scrolltotop />
    </div>
  );
}

export default ProductFeed;

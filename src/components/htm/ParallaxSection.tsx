const ParallaxSection = () => {
  return (
    <div className="section">
      <div className="hero hero--large hero__overlay bg-size relative">
        <img className="bg-img w-full" src="http://localhost:63342/belle-multipurpose-bootstrap-html-template/assets/images/product-images/product-image4-1.jpg" alt="" />
        <div className="hero__inner absolute top-0 left-0 right-0 bottom-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="wrap-text left text-small font-bold">
              <h2 className="h2 mega-title text-4xl font-bold text-white">Belle <br /> The best choice for your store</h2>
              <div className="rte-setting mega-subtitle text-white">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </div>
              <a href="#" className="btn bg-white text-black px-4 py-2 mt-4 inline-block">Purchase Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ParallaxSection;

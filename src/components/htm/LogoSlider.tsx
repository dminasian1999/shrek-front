const LogoSlider = () => {
  return (
    <div className="section logo-section py-8">
      <div className="container mx-auto px-4">
        <div className="section-header text-center">
          <h2 className="h2 text-3xl font-bold">The Most Loved Brands</h2>
        </div>
        <div className="logo-bar grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="logo-bar__item ">
              <img src={`http://localhost:63342/belle-multipurpose-bootstrap-html-template/assets/images/logo/brandlogo1.png`} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;

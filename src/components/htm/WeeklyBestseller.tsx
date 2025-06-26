import MultiCarouselPlugin from "./MultiCarouselPlugin.tsx"

const WeeklyBestseller = () => {


  const products = [
    {
      name: "Edna Dress",
      price: "$600.00",
      oldPrice: "$500.00",
      image: "https://via.placeholder.com/300",
      hoverImage: "https://via.placeholder.com/300",
      labels: [
        { type: "on-sale", text: "Sale" },
        { type: "pr-label1", text: "new" },
      ],
      colors: [
        { name: "navy", hex: "#000080" },
        { name: "green", hex: "#008000" },
        { name: "gray", hex: "#808080" },
        { name: "aqua", hex: "#00FFFF" },
        { name: "orange", hex: "#FFA500" },
      ],
    },
    {
      name: "Elastic Waist Dress",
      price: "$748.00",
      image: "https://via.placeholder.com/300",
      hoverImage: "https://via.placeholder.com/300",
      labels: [],
      colors: [
        { name: "black", hex: "#000000" },
        { name: "navy", hex: "#000080" },
        { name: "purple", hex: "#800080" },
        { name: "teal", hex: "#008080" },
      ],
    },
    // Add more products as needed
  ]
  return (
    <div className="section py-8">
      <div className="container mx-auto px-4">
       <div className="row">
         <div className="section-header text-center">
           <h2 className="h2 text-3xl font-bold">Weekly Bestseller</h2>
           <p>Our most popular products based on sales</p>
         </div>
       </div>
        <MultiCarouselPlugin/>
    </div>
    </div>
  )
}
export default WeeklyBestseller

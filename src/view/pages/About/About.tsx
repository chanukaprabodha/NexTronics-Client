export function About() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-6 sm:px-12">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-bold text-green-700 text-center mb-12">
                        About GreenHarvest
                    </h1>

                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Card 1 - Introduction */}
                        <div
                            className="bg-white rounded-2xl shadow-lg p-8 transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300 border border-green-100">
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">🌿 Who We Are</h2>
                            <p className="text-gray-700 text-lg">
                                Welcome to <span className="font-semibold text-green-800">GreenHarvest Organics</span> —
                                your trusted source for fresh, organic, and eco-friendly produce.
                                We’re passionate about healthy living and sustainable farming.
                            </p>
                        </div>

                        {/* Card 2 - Mission */}
                        <div
                            className="bg-white rounded-2xl shadow-lg p-8 transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300 border border-green-100">
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">🎯 Our Mission</h2>
                            <p className="text-gray-700 text-lg">
                                To bring nature’s goodness to your table while supporting local farmers and
                                environmentally conscious practices.
                            </p>
                        </div>

                        {/* Card 3 - What We Offer */}
                        <div
                            className="bg-white rounded-2xl shadow-lg p-8 transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300 border border-green-100">
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">🚛 What We Offer</h2>
                            <ul className="list-disc list-inside text-gray-700 text-lg space-y-1">
                                <li>100% Certified Organic Fruits & Vegetables</li>
                                <li>Natural Dairy & Grains</li>
                                <li>Eco-friendly Packaging</li>
                                <li>Farm-to-Door Delivery</li>
                            </ul>
                        </div>

                        {/* Card 4 - Why Choose Us */}
                        <div
                            className="bg-white rounded-2xl shadow-lg p-8 transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300 border border-green-100">
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">💚 Why Choose Us</h2>
                            <p className="text-gray-700 text-lg">
                                We believe in honesty, freshness, and community. Every item you receive is handpicked
                                and quality-checked to ensure it’s the best nature has to offer.
                            </p>
                        </div>
                    </div>

                    <p className="text-center text-green-800 italic text-xl mt-16">
                        Thank you for letting us be a part of your healthy lifestyle. 🌱
                    </p>
                </div>
            </div>
        </>
    );
}
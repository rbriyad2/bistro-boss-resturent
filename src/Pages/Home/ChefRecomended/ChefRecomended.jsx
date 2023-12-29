import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import recomendimg1 from '../../../assets/home/chefrec.png'

const ChefRecomended = () => {
    return (
        <section>
            <SectionTitle subheading={'---Should Try---'} heading={'CHEF RECOMMENDS'}></SectionTitle>
            <div className="items grid grid-cols-3 my-8 gap-6">
                <div className="item1 bg-gray-300">
                    <img className='w-full' src={recomendimg1} alt="" />
                    <div className="details text-center mx-auto">
                        <h3 className='text-center mt-7 font-bold text-2xl'>Caeser Salad</h3>
                        <p className='text-center py-2 w-9/12 mx-auto'>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <button className='py-5 mb-8 px-8 btn border-0 border-b-4 mt-3 uppercase hover:bg-black hover:border-black bg-slate-200 border-yellow-700 text-orange-400'>Add to cart</button>
                    </div>
                </div>
                <div className="item1 bg-gray-300">
                    <img className='w-full' src={recomendimg1} alt="" />
                    <div className="details text-center mx-auto">
                        <h3 className='text-center mt-7 font-bold text-2xl'>Caeser Salad</h3>
                        <p className='text-center py-2 w-9/12 mx-auto'>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <button className='py-5 mb-8 px-8 btn border-0 border-b-4 mt-3 uppercase hover:bg-black hover:border-black bg-slate-200 border-yellow-700 text-orange-400'>Add to cart</button>
                    </div>
                </div>
                <div className="item1 bg-gray-300">
                    <img className='w-full' src={recomendimg1} alt="" />
                    <div className="details text-center mx-auto">
                        <h3 className='text-center mt-7 font-bold text-2xl'>Caeser Salad</h3>
                        <p className='text-center py-2 w-9/12 mx-auto'>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <button className='py-5 mb-8 px-8 btn border-0 border-b-4 mt-3 uppercase hover:bg-black hover:border-black bg-slate-200 border-yellow-700 text-orange-400'>Add to cart</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChefRecomended;
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Head from "next/head";

const AboutUs = () => {
    return (
        <>
            <Head>
                <title>За нас</title>
            </Head>
            <div className="flex flex-col h-screen">
                <Navbar />
                <div className="flex-1 w-full xl:w-[75rem] mx-auto my-10 px-6 sm:px-12 lg:px-20 xl:px-0 text-sm sm:text-base">
                    <h3 className="text-lg sm:text-2xl mb-6 text-center">
                        За fitnesnastilki.com – Специалисти в гумени и фитнес настилки
                    </h3>
                    <div className="flex flex-col gap-y-2 mb-5">
                        <p>
                            <span className="font-medium">
                                Fitnesnastilki.com{" "}
                            </span>
                            е специализиран онлайн доставчик 
                            на гумени фитнес настилки, EPDM настилки, SBR подови 
                            покрития и професионални решения за спортни пространства. 
                            С над 12 години опит помагаме на фитнес зали, спортни 
                            клубове, частни тренировки и бизнеси да изграждат безопасни, 
                            устойчиви и функционални подови системи.
                        </p>
                        <p>
                            Нашата основна цел е да предоставим подови настилки, 
                            които издържат на високи натоварвания, осигуряват надеждна 
                            защита и подобряват комфорта при тренировка. Работим 
                            само с утвърдени производители и материали с доказано 
                            качество.
                        </p>
                    </div>

                    <div className="flex flex-col gap-y-2 mb-5">
                        <p className="font-medium">Какво предлагаме:</p>
                        <ul>
                            <li className="list-disc list-inside mb-2">
                                Гумени фитнес настилки - ролки и плочи 
                                <p>
                                    Подходящи за силови тренировки, кардио, кросфит, 
                                    функционални зали и домашни фитнеси.
                                </p>
                            </li>
                            <li className="list-disc list-inside mb-2">
                                EPDM и SBR настилки с различни дебелини
                                <p>
                                    6мм, 8мм, 10мм и други професионални варианти за 
                                    спортни и търговски пространства.
                                </p>
                            </li>
                            <li className="list-disc list-inside mb-2">
                                Подови решения за спортни зали, складове, работни 
                                зони и детски пространства.
                                <p>
                                    Шумоизолация, виброизолация и анти-плъзгаща защита.
                                </p>
                            </li>
                            <li className="list-disc list-inside mb-2">
                                Персонализирани консултации.
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-y-2 mb-5">
                        <p>
                            Помагаме на собственици на зали, архитекти и частни клиенти 
                            да изберат най-подходящата настилка според помещението, 
                            натоварването и бюджета.
                        </p>
                    </div>

                    <div className="flex flex-col gap-y-2 mb-5">
                        <p className="font-medium">Нашите предимства:</p>
                        <ul>
                            <li className="list-disc list-inside mb-2">
                                Доказано качество. 
                                <p>
                                    Всички настилки са с висока плътност, отлична 
                                    устойчивост и дълъг експлоатационен живот.
                                </p>
                            </li>
                            <li className="list-disc list-inside mb-2">
                                Професионален подбор. 
                                <p>
                                    Всеки продукт е внимателно подбран за спортни 
                                    среди с интензивна натовареност.
                                </p>
                            </li>
                            <li className="list-disc list-inside mb-2">
                                Техническа компетентност.
                                <p>
                                    Даваме ясни препоръки за монтаж, поддръжка и 
                                    оптимален избор на дебелина.
                                </p>
                            </li>
                            <li className="list-disc list-inside mb-2">
                                Коректно обслужване. 
                                <p>
                                    Осигуряваме бърза комуникация, точни доставки и 
                                    пълна информация за всеки продукт.
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-y-2 mb-5">
                        <p className="font-medium">Нашата мисия</p>
                        <p>
                            Да предоставяме надеждни и безопасни фитнес настилки, 
                            които създават стабилна основа за всяка тренировка - 
                            както в професионална спортна зала, така и в домашни 
                            условия.
                        </p>
                        <p>
                            Стремим се да бъдем предпочитан партньор за всички, 
                            които ценят качеството и дълготрайността.
                        </p>
                    </div>

                    <div className="flex flex-col gap-y-2 mb-5">
                        <p className="font-medium">Свържете се с нас</p>
                        <p>
                            Ако търсите гумена настилка за фитнес, 
                            EPDM ролки, SBR настилки или специализирано подово 
                            покритие на конкурентна цена, сържете се с нас.
                        </p>
                        <p>
                            Ще ви предоставим професионална консултация и най-подходящото 
                            решение за вашето пространство.
                        </p>
                    </div>

                    <p>
                        <span className="font-medium">
                            Fitnesnastilki.com -{" "} 
                        </span>
                        професионални подови настилки за всяко 
                        спортно пространство.
                    </p>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default AboutUs;

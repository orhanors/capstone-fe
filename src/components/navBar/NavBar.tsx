import React, { useRef, useState } from "react";
import Logo from "../../assets/imgs/logo.png";
import FacebookLogo from "../../assets/icons/FacebookLogo";
import InstagramLogo from "../../assets/icons/InstagramLogo";
import SearchIcon from "../../assets/icons/SearchIcon";
import UserIcon from "../../assets/icons/UserIcon";
import CartIcon from "../../assets/icons/CartIcon";
import { FaBars } from "react-icons/fa";
import "./navbar.scss";
import ProductsSidebar from "../productsSidebar/ProductsSidebar";
import { useDispatch } from "react-redux";
import { setProductSidebar } from "../../store/productSidebar/productSide";
import { useSelector } from "../../store/_helpers/useCustomSelector";
import { setSearchSidebar } from "../../store/searchSidebar/searchSide";
import SearchSidebar from "../searchSidebar/SearchSidebar";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { BsChevronCompactDown, BsChevronCompactRight } from "react-icons/bs";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import EnFlag from "../../assets/imgs/en.svg";
import TrFlag from "../../assets/imgs/tr.svg";
function NavBar() {
	const { i18n, t } = useTranslation();
	const dispatch = useDispatch();

	const [showLanguages, setShowLanguages] = useState(false);
	const { productSidebar, searchSidebar } = useSelector((store) => store);
	const navRef = useRef<HTMLDivElement>(null);
	const langSwitcherRef = useRef(null);
	const iconColor = "gray";

	const handleResponsive = () => {
		if (
			navRef.current!.className ===
			"nav-container d-flex justify-content-between"
		) {
			navRef.current!.classList.add("responsive");
		} else {
			navRef.current!.className =
				"nav-container d-flex justify-content-between";
		}
	};
	useOnClickOutside(langSwitcherRef, () => setShowLanguages(false));
	return (
		<>
			{showLanguages && <LanguageSwitcher ref={langSwitcherRef} />}
			<div
				ref={navRef}
				className='nav-container d-flex justify-content-between'>
				<div className='nav-portion d-flex justify-content-between'>
					<span className='nav-icon mx-2'>
						<FacebookLogo color={iconColor} />
					</span>
					<span className='nav-icon mx-2'>
						<InstagramLogo color={iconColor} />
					</span>

					<span
						className='nav-icon mx-2'
						onClick={() => setShowLanguages(!showLanguages)}>
						<img
							alt='lng'
							className='flag mb-1 mr-1'
							src={i18n.language === "en" ? EnFlag : TrFlag}
						/>{" "}
						{i18n.language}{" "}
						<span className='dropdown-arrow'>
							{showLanguages ? (
								<BsChevronCompactDown />
							) : (
								<BsChevronCompactRight />
							)}
						</span>{" "}
					</span>
				</div>
				<div className='nav-portion d-flex justify-content-between'>
					<p className='nav-item-text mx-3 grow'>
						{t("navbar.products")}
					</p>
					<p className='nav-item-text mx-3 grow'>
						{t("navbar.about")}
					</p>
				</div>
				<div className='nav-portion d-flex justify-content-between'>
					<img className='logo' alt='logo' src={Logo} />
				</div>
				<div className='nav-portion d-flex justify-content-between'>
					<p className='nav-item-text mx-3 grow'>
						{t("navbar.blog")}
					</p>
					<p className='nav-item-text mx-3 grow'>
						{t("navbar.contact")}
					</p>
				</div>
				<div className='nav-portion d-flex justify-content-between'>
					<span
						onClick={() => dispatch(setSearchSidebar())}
						className='nav-icon mx-2'>
						<SearchIcon color={iconColor} />
					</span>
					<span className='nav-icon mx-2'>
						<UserIcon color={iconColor} />
					</span>
					<span
						onClick={() => dispatch(setProductSidebar())}
						className='nav-icon mx-2'>
						<CartIcon color={iconColor} />
					</span>
				</div>
				{productSidebar && <ProductsSidebar />}
				{searchSidebar && <SearchSidebar />}
				<span
					onClick={handleResponsive}
					className='nav-icon nav-toggle-icon mx-2'>
					<FaBars color={iconColor} />
				</span>
			</div>
		</>
	);
}

export default NavBar;

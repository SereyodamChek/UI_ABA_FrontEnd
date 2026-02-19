/* eslint-disable @next/next/no-img-element */
"use client";

import styles from "../dashboard/Dashboard.module.css";
import { Button, Dialog, Heading, Modal, ModalOverlay } from "react-aria-components";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faBars,
  faHouse,
  faBank,
  faUser,
  faPlus,
  faSignOut,
  faSearch,
  faClipboardList,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { faChartBar } from "@fortawesome/free-solid-svg-icons/faChartBar";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";


/* 🔥 SAME TRANSLATIONS OBJECT — DO NOT TOUCH */
const translations: Record<string, Record<string, string>> = {
  km: {
    "បញ្ជីគណនី": "បញ្ជីគណនី",
    "វិស័យហិរញ្ញវត្ថុ": "វិស័យហិរញ្ញវត្ថុ",
    "អតិថិជន": "អតិថិជន",
    "កម្មវិធីគ្រប់គ្រង": "កម្មវិធីគ្រប់គ្រង",
    "លេខទំនាក់ទំនង": "លេខទំនាក់ទំនង",
    "Ask Navi": "Ask Navi",
    "All Currency": "រូបិយប័ណ្ណ",
    "Channel": "បញ្ជី",
    "Online": "អនឡាញ",
    "USD": "USD",
    "KHR": "KHR",
    "Report": "រាយការណ៍",
    "Last Month": "ខែមុន",
    "Last 3 Months": "៣ ខែចុងក្រោយ",
    "ស្វែងរកតាមឈ្មោះ ឬលេខគណនី": "ស្វែងរកតាមឈ្មោះ ឬលេខគណនី",
    "7 ថ្ងៃចុងក្រោយ": "7 ថ្ងៃចុងក្រោយ",
    "30 ថ្ងៃចុងក្រោយ": "30 ថ្ងៃចុងក្រោយ",
    "ចាកចេញ": "ចាកចេញ",
    "Confirm Logout": "បញ្ជាក់ការចាកចេញ",
    "Are you sure you want to log out?": "តើអ្នកប្រាកដថាចង់ចាកចេញមែនទេ?",
    "No": "ទេ",
    "Yes, Logout": "បាទ/ចាស, ចាកចេញ",
    "មិនមានទិន្នន័យនៅឡើយ": "មិនមានទិន្នន័យនៅឡើយ",
  },

  en: {
    "បញ្ជីគណនី": "Dashboard",
    "វិស័យហិរញ្ញវត្ថុ": "Finance",
    "អតិថិជន": "Customer",
    "កម្មវិធីគ្រប់គ្រង": "Management",
    "លេខទំនាក់ទំនង": "Contacts",
    "Ask Navi": "Ask Navi",
    "All Currency": "All Currency",
    "Channel": "Channel",
    "Online": "Online",
    "USD": "USD",
    "KHR": "KHR",
    "Report": "Report",
    "Last Month": "Last Month",
    "Last 3 Months": "Last 3 Months",
    "ស្វែងរកតាមឈ្មោះ ឬលេខគណនី": "Search by name or account number",
    "7 ថ្ងៃចុងក្រោយ": "Last 7 Days",
    "30 ថ្ងៃចុងក្រោយ": "Last 30 Days",
    "ចាកចេញ": "Log Out",
    "Confirm Logout": "Confirm Logout",
    "Are you sure you want to log out?": "Are you sure you want to log out?",
    "No": "No",
    "Yes, Logout": "Yes, Logout",
    "មិនមានទិន្នន័យនៅឡើយ": "No data yet",
  },

  zh: {
    "បញ្ជីគណនី": "仪表盘",
    "វិស័យហិរញ្ញវត្ថុ": "财务",
    "អតិថិជន": "客户",
    "កម្មវិធីគ្រប់គ្រង": "管理",
    "លេខទំនាក់ទំនង": "联系方式",
    "Ask Navi": "询问导航",
    "All Currency": "所有货币",
    "Channel": "渠道",
    "Online": "在线",
    "USD": "美元",
    "KHR": "柬埔寨瑞尔",
    "Report": "报告",
    "Last Month": "上个月",
    "Last 3 Months": "最近3个月",
    "ស្វែងរកតាមឈ្មោះ ឬលេខគណនី": "按姓名或账号搜索",
    "7 ថ្ងៃចុងក្រោយ": "最近7天",
    "30 ថ្ងៃចុងក្រោយ": "最近30天",
    "ចាកចេញ": "登出",
    "Confirm Logout": "确认登出",
    "Are you sure you want to log out?": "您确定要登出吗？",
    "No": "取消",
    "Yes, Logout": "是的，登出",
    "មិនមានទិន្នន័យនៅឡើយ": "暂无数据",
  },
};

export default function ContactsPage() {
  const router = useRouter();

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<"km" | "en" | "zh">("km");
  const langMenuRef = useRef<HTMLDivElement>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(target) &&
        !target.parentElement?.closest(".settings-icon")
      ) {
        setIsLangMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLangMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const t = (key: string) => translations[currentLang]?.[key] || key;

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLangMenuOpen((v) => !v);
  };

  const handleLanguageChange = (lang: "km" | "en" | "zh") => {
    setCurrentLang(lang);
    setIsLangMenuOpen(false);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    if (window.innerWidth < 769) setIsSidebarVisible(false);
  };

  const handleLogout = () => {
    if (window.innerWidth < 769) setIsSidebarVisible(false);
    setIsLogoutModalOpen(true);
  };


  return (
    <div className="dashboard-page" suppressHydrationWarning>
      {/* HEADER */}
      <div className="header">
        <div className="header-left">
          <div className="user-dropdown">
            <div className="user-avatar">
              <img
                src="/aba-logo.png"
                alt="ABA Bank Logo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          <div
            className="menu-icon"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>

          {/* ✅ KEEP YOUR SAME HEADER LOGO/SVG HERE (copy from dashboard) */}
          <div className="logo">
            <svg
              viewBox="0 0 222 28"
              fill="none"
              style={{ width: "200px", height: "auto" }}
            >
              <path
                d="M29.803 5.049H41.07c4.95 0 7.507 2.066 7.507 5.78 0 2.283-.926 3.844-2.858 4.703 2.497.955 3.696 2.733 3.696 5.416 0 4.345-3.06 6.952-8.707 6.952H29.803zm-15.515 0l8.611 22.85h-5.155l-1.628-4.698H6.84L5.28 27.9H.1L8.608 5.049zm54.173 0l8.62 22.85h-5.16l-1.631-4.698h-9.274L59.454 27.9h-5.18l8.503-22.851zM40.335 23.772c2.693 0 3.965-.869 3.965-2.96 0-2.234-1.272-3.022-3.996-3.022h-5.783v5.982zm-32.201-4.42h6.65L11.47 9.625zm54.179 0h6.647l-3.32-9.727zM40.138 13.88c2.355 0 3.49-.728 3.49-2.48 0-1.774-1.159-2.38-3.527-2.38h-5.58v4.86z"
                fill="#FFFF"
              ></path>
              <path
                d="M134.048 26.566v-2.978q2.599 2.233 5.715 2.233 1.548 0 2.571-.572 1.023-.571 1.023-1.733 0-.872-.631-1.426-.63-.555-1.873-.953l-2.39-.781q-2.141-.636-3.259-1.716t-1.118-2.969q0-2.106 1.758-3.377 1.759-1.272 4.397-1.271 2.944 0 5.161 1.452v2.906q-2.504-1.98-5.161-1.98-1.377 0-2.332.581-.956.582-.956 1.58 0 .925.592 1.39.593.462 1.989.953l2.657.853q4.071 1.325 4.071 4.649 0 2.287-1.911 3.54-1.854 1.253-4.588 1.253-1.625 0-3.164-.454-1.539-.453-2.551-1.18m59.664 0v-2.978c1.732 1.489 3.632 2.233 5.713 2.233 1.035 0 1.889-.19 2.574-.572q1.022-.571 1.023-1.733a1.83 1.83 0 00-.632-1.426q-.631-.555-1.876-.953l-2.388-.781q-2.14-.636-3.26-1.716-1.118-1.08-1.118-2.969-.002-2.106 1.756-3.377 1.76-1.272 4.396-1.271 2.949 0 5.166 1.452v2.906q-2.506-1.98-5.166-1.98-1.371 0-2.327.581-.956.582-.956 1.58.001.925.589 1.39c.397.308 1.058.626 1.991.953l2.658.853q4.07 1.325 4.071 4.649 0 2.287-1.912 3.54-1.857 1.253-4.589 1.253a11.2 11.2 0 01-3.163-.454q-1.542-.453-2.55-1.18m15.173 0v-2.978q2.6 2.233 5.714 2.233 1.55 0 2.568-.572 1.028-.571 1.028-1.733c0-.581-.216-1.057-.631-1.426q-.632-.555-1.877-.953l-2.387-.781q-2.14-.636-3.26-1.716t-1.119-2.969q-.001-2.106 1.757-3.377c1.172-.848 2.64-1.271 4.396-1.271q2.948 0 5.166 1.452v2.906q-2.506-1.98-5.166-1.98-1.371 0-2.328.581-.956.582-.956 1.58.002.925.59 1.39.593.462 1.99.953l2.658.853q4.07 1.325 4.072 4.649 0 2.287-1.913 3.54-1.856 1.253-4.588 1.253a11.1 11.1 0 01-3.164-.454q-1.54-.453-2.55-1.18m-78.828-15.198v16.505h-2.963v-2.088q-.784 1.053-2.122 1.734t-2.944.681q-2.887 0-4.473-1.634-1.587-1.634-1.587-4.376V11.368h2.982v10.368q0 1.78.946 2.842.947 1.062 2.839 1.062a4.48 4.48 0 002.686-.863 4.55 4.55 0 001.673-2.224V11.368zm59.511 15.397c-1.317.957-3.073 1.435-5.28 1.435q-3.8 0-6.057-2.251-2.316-2.307-2.315-6.174.002-3.885 2.141-6.301 2.182-2.451 5.599-2.451 3.447 0 5.287 2.197 1.847 2.197 1.846 5.883v.999h-11.986q.117 2.76 1.732 4.203 1.613 1.444 4.101 1.444c1.757 0 3.398-.52 4.932-1.562zm-31.345 1.108V11.368h2.94v2.07c.524-.69 1.239-1.265 2.154-1.725q1.363-.69 2.97-.69c1.925 0 3.422.547 4.505 1.643q1.614 1.643 1.612 4.385v10.822h-2.983V17.505q0-1.779-.975-2.842-.974-1.061-2.868-1.062-1.488 0-2.713.863-1.225.862-1.702 2.224v11.185zm-50.298-11.82q1.911.471 3.125 1.988 1.215 1.515 1.215 3.404 0 3.088-2.132 4.758t-5.859 1.67h-8.679V5.05h7.895q3.766 0 5.859 1.57t2.093 4.477q0 1.906-1.003 3.204-1.004 1.299-2.514 1.753m45.252-4.685v16.505h-2.941V11.368zm-54.58 6.065v7.88h5.677q2.39 0 3.68-1.062t1.29-2.878q0-1.834-1.281-2.887-1.281-1.054-3.689-1.053zm85.101-4.032q-1.76 0-3.061 1.163-1.299 1.162-1.678 3.34h8.961q-.092-1.96-1.167-3.232c-.709-.847-1.732-1.27-3.055-1.27m-85.102 1.562h4.894q2.409 0 3.69-.926 1.28-.925 1.28-2.778 0-3.65-4.97-3.65h-4.894zm55.002-8.589q.001.709-.566 1.254a1.87 1.87 0 01-1.347.544q-.721 0-1.299-.554-.57-.554-.571-1.244-.002-.744.565-1.262a1.87 1.87 0 011.305-.517q.786 0 1.347.517.567.518.566 1.262"
                fill="#00CDD4"
              ></path>
              <path d="M84.752.2H79.94v9.14h4.811z" fill="#EC1E24"></path>
            </svg>
          </div>
        </div>

        <div className="header-right">
          <div className="navi-toggle">
            <img
              src="/navi.png"
              alt="Navi toggle icon"
              style={{ height: 25, width: 25 }}
            />
            <span>{t("Ask Navi")}</span>
          </div>

          {/* ✅ FLAG LANGUAGE MENU (same as dashboard) */}
          <div className={`settings-container lang ${isLangMenuOpen ? "open" : ""}`}>
            <div className="settings-icon" onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}>
              <FontAwesomeIcon icon={faGear} />
            </div>

            {isLangMenuOpen && (
              <div
                ref={langMenuRef}
                className="lang-menu"
                role="menu"
                aria-label="Languages"
              >
                <div className="lang-item" role="menuitem" tabIndex={0} onClick={() => handleLanguageChange("km")}>
                  <span className="flag">
                    <Image src="/khmer.png" alt="Khmer" width={16} height={12} />
                  </span>
                  <div>ខ្មែរ</div>
                </div>

                <div className="lang-item" role="menuitem" tabIndex={0} onClick={() => handleLanguageChange("en")}>
                  <span className="flag">
                    <Image src="/english.png" alt="English" width={16} height={12} />
                  </span>
                  <div>English</div>
                </div>

                <div className="lang-item" role="menuitem" tabIndex={0} onClick={() => handleLanguageChange("zh")}>
                  <span className="flag">
                    <Image src="/china.png" alt="Chinese" width={16} height={12} />
                  </span>
                  <div>中文</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Sidebar Section */}
      <div className={`main-container ${!isSidebarVisible ? "sidebar-collapsed" : ""}`}>
        <div className={`sidebar ${isSidebarVisible ? "open" : ""}`}>
          <div className="sidebar-menu">

            <div className="menu-item" onClick={() => handleNavigate("/dashboard")}>
              <div className="menu-icon-wrapper">
                <FontAwesomeIcon icon={faHouse} />
              </div>
              <div className="menu-text">{t("បញ្ជីគណនី")}</div>
            </div>

            <div className="menu-item" onClick={() => handleNavigate("/finance")}>
              <div className="menu-icon-wrapper">
                <FontAwesomeIcon icon={faBank} />
              </div>
              <div className="menu-text">{t("វិស័យហិរញ្ញវត្ថុ")}</div>
            </div>

            <div className="menu-item" onClick={() => handleNavigate("/customer")}>
              <div className="menu-icon-wrapper">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="menu-text">{t("អតិថិជន")}</div>
            </div>

            <div className="menu-item" onClick={() => handleNavigate("/management")}>
              <div className="menu-icon-wrapper">
                <FontAwesomeIcon icon={faChartBar} />
              </div>
              <div className="menu-text">{t("កម្មវិធីគ្រប់គ្រង")}</div>
            </div>

            {/* ✅ CONTACTS ACTIVE */}
            <div className="menu-item active">
              <div className="menu-icon-wrapper">
                <FontAwesomeIcon icon={faLink} />
              </div>
              <div className="menu-text">{t("លេខទំនាក់ទំនង")}</div>
            </div>

            <div className="menu-item" onClick={handleLogout}>
              <div className="menu-icon-wrapper">
                <FontAwesomeIcon icon={faSignOut} />
              </div>
              <div className="menu-text">{t("ចាកចេញ")}</div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">
          <div className="page-title">{t("លេខទំនាក់ទំនង")}</div>

          <div className="filters">
            <select className="filter-select">
              <option>{t("All Currency")}</option>
              <option>{t("USD")}</option>
              <option>{t("KHR")}</option>
            </select>

            <select className="filter-select">
              <option>{t("Channel")}</option>
              <option>{t("Online")}</option>
            </select>

            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder={t("ស្វែងរកតាមឈ្មោះ ឬលេខគណនី")}
              />
              <div className="search-icon">
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>
          </div>

          <div className="empty-state">
            <div style={{ fontSize: 50, color: "#ccc" }}>
              <FontAwesomeIcon icon={faClipboardList} />
            </div>
            <div>{t("មិនមានទិន្នន័យនៅឡើយ")}</div>
          </div>
        </div>
      </div>

      <button className="add-button">
        <FontAwesomeIcon icon={faPlus} />
        <span>{t("លេខទំនាក់ទំនង")}</span>
      </button>

      <LogoutConfirmationDialog
        isOpen={isLogoutModalOpen}
        onOpenChange={setIsLogoutModalOpen}
        t={t}
      />
    </div>
  );
}
 
function DialogButton({
  className,
  ...props
}: { className?: string } & React.ComponentProps<typeof Button>) {
  return <Button {...props} className={`${styles.dialogButton} ${className}`} />;
}

function LogoutConfirmationDialog({
  isOpen,
  onOpenChange,
  t,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  t: (key: string) => string;
}) {
  const router = useRouter();

  const performLogout = () => {
    router.push("/");
  };

  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange} className={styles.modalOverlay}>
      <Modal className={styles.modal}>
        <Dialog role="alertdialog" className={styles.dialog}>
          {({ close }) => (
            <>
              <Heading slot="title" className={styles.dialogTitle}>
                {t("Confirm Logout")}
              </Heading>
              <div className={styles.dialogIcon}>
                <FontAwesomeIcon icon={faTriangleExclamation} size="lg" />
              </div>
              <p className={styles.dialogDescription}>{t("Are you sure you want to log out?")}</p>
              <div className={styles.dialogButtonContainer}>
                <DialogButton className={styles.cancelButton} onPress={close}>
                  {t("No")}
                </DialogButton>
                <DialogButton className={styles.confirmButton} onPress={performLogout}>
                  {t("Yes, Logout")}
                </DialogButton>
              </div>
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
   

"use client";

import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import {
  Dialog,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faYoutube,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

/*
export const metadata: Metadata = {
  title: "ABA HRMIS — Login",
};
*/

export default function LoginPage() {
  const [isLangMenuOpen, setLangMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"km" | "en" | "cn">("km");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const router = useRouter();

  const translations = {
    km: {
      loginTitle: "ចូលគណនី",
      brandSub:
        "ប្រព័ន្ធគ្រប់គ្រងធនធានមនុស្ស​ និងទិន្នន័យបុគ្គលិករបស់ធនាគារអេប៊ីអេ។",
      usernameLabel: "ឈ្មោះអ្នកប្រើ",
      usernamePlaceholder: "បញ្ចូលឈ្មោះអ្នកប្រើ",
      passwordLabel: "ពាក្យសម្ងាត់",
      passwordPlaceholder: "បញ្ចូលពាក្យសម្ងាត់",
      loginButton: "ចូល",
      forgotPassword: "ភ្លេចពាក្យសម្ងាត់?",
      loginError: "ឈ្មោះ​អ្នកប្រើប្រាស់ ឬ​ពាក្យ​សម្ងាត់​មិន​ត្រឹមត្រូវ។",
      successTitle: "ចូលដោយជោគជ័យ!",
      successMessage: "សូមស្វាគមន៍មកកាន់ ABA HRMIS",
      successRedirect: "កំពុងបញ្ជូនទៅកាន់ផ្ទាំងគ្រប់គ្រង...",
    },
    en: {
      loginTitle: "Login",
      brandSub:
        "Human Resource Management Information System and staff data of ABA Bank.",
      usernameLabel: "Username",
      usernamePlaceholder: "Enter username",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter password",
      loginButton: "Login",
      forgotPassword: "Forgot password?",
      loginError: "Invalid username or password.",
      successTitle: "Login Successful!",
      successMessage: "Welcome back to ABA HRMIS",
      successRedirect: "Redirecting to dashboard...",
    },
    cn: {
      loginTitle: "登录",
      brandSub: "ABA银行的人力资源管理信息系统和员工数据。",
      usernameLabel: "用户名",
      usernamePlaceholder: "输入用户名",
      passwordLabel: "密码",
      passwordPlaceholder: "输入密码",
      loginButton: "登录",
      forgotPassword: "忘记密码？",
      loginError: "无效的用户名或密码。",
      successTitle: "登录成功！",
      successMessage: "欢迎回到 ABA HRMIS",
      successRedirect: "正在重定向到仪表板...",
    },
  };

  useEffect(() => {
    const closeMenu = () => setLangMenuOpen(false);
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    if (isLangMenuOpen) {
      document.addEventListener("click", closeMenu);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("click", closeMenu);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isLangMenuOpen]);

  const toggleLangMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLangMenuOpen((prev) => !prev);
  };

  const handleLangChange = (lang: "km" | "en" | "cn") => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // Check credentials
    if (username === "pudom" && password === "123$") {
      setShowSuccess(true);
      localStorage.setItem("aba_auth", "admin");
      // Redirect after success animation completes
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      setError(translations[language].loginError);
    }
  };

  return (
    <>
      <div className="page" suppressHydrationWarning>
        {/* Success Alert Modal */}
        <ModalOverlay
          isOpen={showSuccess}
          onOpenChange={setShowSuccess}
          className={styles.successOverlay}
        >
          <Modal className={styles.modal}>
            <Dialog className={styles.successModal}>
              <>
                <div className={styles.successIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <Heading slot="title" className={styles.successTitle}>
                  {translations[language].successTitle}
                </Heading>
                <p className={styles.successMessage}>{translations[language].successMessage}</p>
                <p className={styles.successRedirect}>
                  {translations[language].successRedirect}
                </p>
              </>
            </Dialog>
          </Modal>
        </ModalOverlay>
        <header className="topbar" aria-label="ABA Admin">
          <div className="logo">
            <svg
              data-v-865b1154=""
              viewBox="0 0 222 28"
              fill="none"
              style={{ width: "225px", height: "30px" }}
            >
              <path
                data-v-865b1154=""
                d="M29.803 5.049H41.07c4.95 0 7.507 2.066 7.507 5.78 0 2.283-.926 3.844-2.858 4.703 2.497.955 3.696 2.733 3.696 5.416 0 4.345-3.06 6.952-8.707 6.952H29.803zm-15.515 0l8.611 22.85h-5.155l-1.628-4.698H6.84L5.28 27.9H.1L8.608 5.049zm54.173 0l8.62 22.85h-5.16l-1.631-4.698h-9.274L59.454 27.9h-5.18l8.503-22.851zM40.335 23.772c2.693 0 3.965-.869 3.965-2.96 0-2.234-1.272-3.022-3.996-3.022h-5.783v5.982zm-32.201-4.42h6.65L11.47 9.625zm54.179 0h6.647l-3.32-9.727zM40.138 13.88c2.355 0 3.49-.728 3.49-2.48 0-1.774-1.159-2.38-3.527-2.38h-5.58v4.86z"
                fill="#005D7B"
              ></path>
              <path
                data-v-865b1154=""
                d="M134.048 26.566v-2.978q2.599 2.233 5.715 2.233 1.548 0 2.571-.572 1.023-.571 1.023-1.733 0-.872-.631-1.426-.63-.555-1.873-.953l-2.39-.781q-2.141-.636-3.259-1.716t-1.118-2.969q0-2.106 1.758-3.377 1.759-1.272 4.397-1.271 2.944 0 5.161 1.452v2.906q-2.504-1.98-5.161-1.98-1.377 0-2.332.581-.956.582-.956 1.58 0 .925.592 1.39.593.462 1.989.953l2.657.853q4.071 1.325 4.071 4.649 0 2.287-1.911 3.54-1.854 1.253-4.588 1.253-1.625 0-3.164-.454-1.539-.453-2.551-1.18m59.664 0v-2.978c1.732 1.489 3.632 2.233 5.713 2.233 1.035 0 1.889-.19 2.574-.572q1.022-.571 1.023-1.733a1.83 1.83 0 00-.632-1.426q-.631-.555-1.876-.953l-2.388-.781q-2.14-.636-3.26-1.716-1.118-1.08-1.118-2.969-.002-2.106 1.756-3.377 1.76-1.272 4.396-1.271 2.949 0 5.166 1.452v2.906q-2.506-1.98-5.166-1.98-1.371 0-2.327.581-.956.582-.956 1.58.001.925.589 1.39c.397.308 1.058.626 1.991.953l2.658.853q4.07 1.325 4.071 4.649 0 2.287-1.912 3.54-1.857 1.253-4.589 1.253a11.2 11.2 0 01-3.163-.454q-1.542-.453-2.55-1.18m15.173 0v-2.978q2.6 2.233 5.714 2.233 1.55 0 2.568-.572 1.028-.571 1.028-1.733c0-.581-.216-1.057-.631-1.426q-.632-.555-1.877-.953l-2.387-.781q-2.14-.636-3.26-1.716t-1.119-2.969q-.001-2.106 1.757-3.377c1.172-.848 2.64-1.271 4.396-1.271q2.948 0 5.166 1.452v2.906q-2.506-1.98-5.166-1.98-1.371 0-2.328.581-.956.582-.956 1.58.002.925.59 1.39.593.462 1.99.953l2.658.853q4.07 1.325 4.072 4.649 0 2.287-1.913 3.54-1.856 1.253-4.588 1.253a11.1 11.1 0 01-3.164-.454q-1.54-.453-2.55-1.18m-78.828-15.198v16.505h-2.963v-2.088q-.784 1.053-2.122 1.734t-2.944.681q-2.887 0-4.473-1.634-1.587-1.634-1.587-4.376V11.368h2.982v10.368q0 1.78.946 2.842.947 1.062 2.839 1.062a4.48 4.48 0 002.686-.863 4.55 4.55 0 001.673-2.224V11.368zm59.511 15.397c-1.317.957-3.073 1.435-5.28 1.435q-3.8 0-6.057-2.251-2.316-2.307-2.315-6.174.002-3.885 2.141-6.301 2.182-2.451 5.599-2.451 3.447 0 5.287 2.197 1.847 2.197 1.846 5.883v.999h-11.986q.117 2.76 1.732 4.203 1.613 1.444 4.101 1.444c1.757 0 3.398-.52 4.932-1.562zm-31.345 1.108V11.368h2.94v2.07c.524-.69 1.239-1.265 2.154-1.725q1.363-.69 2.97-.69c1.925 0 3.422.547 4.505 1.643q1.614 1.643 1.612 4.385v10.822h-2.983V17.505q0-1.779-.975-2.842-.974-1.061-2.868-1.062-1.488 0-2.713.863-1.225.862-1.702 2.224v11.185zm-50.298-11.82q1.911.471 3.125 1.988 1.215 1.515 1.215 3.404 0 3.088-2.132 4.758t-5.859 1.67h-8.679V5.05h7.895q3.766 0 5.859 1.57t2.093 4.477q0 1.906-1.003 3.204-1.004 1.299-2.514 1.753m45.252-4.685v16.505h-2.941V11.368zm-54.58 6.065v7.88h5.677q2.39 0 3.68-1.062t1.29-2.878q0-1.834-1.281-2.887-1.281-1.054-3.689-1.053zm85.101-4.032q-1.76 0-3.061 1.163-1.299 1.162-1.678 3.34h8.961q-.092-1.96-1.167-3.232c-.709-.847-1.732-1.27-3.055-1.27m-85.102 1.562h4.894q2.409 0 3.69-.926 1.28-.925 1.28-2.778 0-3.65-4.97-3.65h-4.894zm55.002-8.589q.001.709-.566 1.254a1.87 1.87 0 01-1.347.544q-.721 0-1.299-.554-.57-.554-.571-1.244-.002-.744.565-1.262a1.87 1.87 0 011.305-.517q.786 0 1.347.517.567.518.566 1.262"
                fill="#00CDD4"
              ></path>
              <path
                data-v-865b1154=""
                d="M84.752.2H79.94v9.14h4.811z"
                fill="#EC1E24"
              ></path>
            </svg>
          </div>
        </header>
        <main className="main" role="main">
          <section
            className="card"
            role="region"
            aria-labelledby="login-title"
          >
            <div className="card-grid">
              <aside className="brand-pane" aria-hidden="true">
                <svg
                  data-v-865b1154=""
                  viewBox="0 5 333 50"
                  fill="none"
                  style={{ width: "300px", height: "50px" }}
                >
                  <path
                    data-v-865b1154=""
                    d="M29.803 5.049H41.07c4.95 0 7.507 2.066 7.507 5.78 0 2.283-.926 3.844-2.858 4.703 2.497.955 3.696 2.733 3.696 5.416 0 4.345-3.06 6.952-8.707 6.952H29.803zm-15.515 0l8.611 22.85h-5.155l-1.628-4.698H6.84L5.28 27.9H.1L8.608 5.049zm54.173 0l8.62 22.85h-5.16l-1.631-4.698h-9.274L59.454 27.9h-5.18l8.503-22.851zM40.335 23.772c2.693 0 3.965-.869 3.965-2.96 0-2.234-1.272-3.022-3.996-3.022h-5.783v5.982zm-32.201-4.42h6.65L11.47 9.625zm54.179 0h6.647l-3.32-9.727zM40.138 13.88c2.355 0 3.49-.728 3.49-2.48 0-1.774-1.159-2.38-3.527-2.38h-5.58v4.86z"
                    fill="#0bbcd4"
                  ></path>
                  <path
                    data-v-865b1154=""
                    d="M134.048 26.566v-2.978q2.599 2.233 5.715 2.233 1.548 0 2.571-.572 1.023-.571 1.023-1.733 0-.872-.631-1.426-.63-.555-1.873-.953l-2.39-.781q-2.141-.636-3.259-1.716t-1.118-2.969q0-2.106 1.758-3.377 1.759-1.272 4.397-1.271 2.944 0 5.161 1.452v2.906q-2.504-1.98-5.161-1.98-1.377 0-2.332.581-.956.582-.956 1.58 0 .925.592 1.39.593.462 1.989.953l2.657.853q4.071 1.325 4.071 4.649 0 2.287-1.911 3.54-1.854 1.253-4.588 1.253-1.625 0-3.164-.454-1.539-.453-2.551-1.18m59.664 0v-2.978c1.732 1.489 3.632 2.233 5.713 2.233 1.035 0 1.889-.19 2.574-.572q1.022-.571 1.023-1.733a1.83 1.83 0 00-.632-1.426q-.631-.555-1.876-.953l-2.388-.781q-2.14-.636-3.26-1.716-1.118-1.08-1.118-2.969-.002-2.106 1.756-3.377 1.76-1.272 4.396-1.271 2.949 0 5.166 1.452v2.906q-2.506-1.98-5.166-1.98-1.371 0-2.327.581-.956.582-.956 1.58.001.925.589 1.39c.397.308 1.058.626 1.991.953l2.658.853q4.07 1.325 4.071 4.649 0 2.287-1.912 3.54-1.857 1.253-4.589 1.253a11.2 11.2 0 01-3.163-.454q-1.542-.453-2.55-1.18m15.173 0v-2.978q2.6 2.233 5.714 2.233 1.55 0 2.568-.572 1.028-.571 1.028-1.733c0-.581-.216-1.057-.631-1.426q-.632-.555-1.877-.953l-2.387-.781q-2.14-.636-3.26-1.716t-1.119-2.969q-.001-2.106 1.757-3.377c1.172-.848 2.64-1.271 4.396-1.271q2.948 0 5.166 1.452v2.906q-2.506-1.98-5.166-1.98-1.371 0-2.328.581-.956.582-.956 1.58.002.925.59 1.39.593.462 1.99.953l2.658.853q4.07 1.325 4.072 4.649 0 2.287-1.913 3.54-1.856 1.253-4.588 1.253a11.1 11.1 0 01-3.164-.454q-1.54-.453-2.55-1.18m-78.828-15.198v16.505h-2.963v-2.088q-.784 1.053-2.122 1.734t-2.944.681q-2.887 0-4.473-1.634-1.587-1.634-1.587-4.376V11.368h2.982v10.368q0 1.78.946 2.842.947 1.062 2.839 1.062a4.48 4.48 0 002.686-.863 4.55 4.55 0 001.673-2.224V11.368zm59.511 15.397c-1.317.957-3.073 1.435-5.28 1.435q-3.8 0-6.057-2.251-2.316-2.307-2.315-6.174.002-3.885 2.141-6.301 2.182-2.451 5.599-2.451 3.447 0 5.287 2.197 1.847 2.197 1.846 5.883v.999h-11.986q.117 2.76 1.732 4.203 1.613 1.444 4.101 1.444c1.757 0 3.398-.52 4.932-1.562zm-31.345 1.108V11.368h2.94v2.07c.524-.69 1.239-1.265 2.154-1.725q1.363-.69 2.97-.69c1.925 0 3.422.547 4.505 1.643q1.614 1.643 1.612 4.385v10.822h-2.983V17.505q0-1.779-.975-2.842-.974-1.061-2.868-1.062-1.488 0-2.713.863-1.225.862-1.702 2.224v11.185zm-50.298-11.82q1.911.471 3.125 1.988 1.215 1.515 1.215 3.404 0 3.088-2.132 4.758t-5.859 1.67h-8.679V5.05h7.895q3.766 0 5.859 1.57t2.093 4.477q0 1.906-1.003 3.204-1.004 1.299-2.514 1.753m45.252-4.685v16.505h-2.941V11.368zm-54.58 6.065v7.88h5.677q2.39 0 3.68-1.062t1.29-2.878q0-1.834-1.281-2.887-1.281-1.054-3.689-1.053zm85.101-4.032q-1.76 0-3.061 1.163-1.299 1.162-1.678 3.34h8.961q-.092-1.96-1.167-3.232c-.709-.847-1.732-1.27-3.055-1.27m-85.102 1.562h4.894q2.409 0 3.69-.926 1.28-.925 1.28-2.778 0-3.65-4.97-3.65h-4.894zm55.002-8.589q.001.709-.566 1.254a1.87 1.87 0 01-1.347.544q-.721 0-1.299-.554-.57-.554-.571-1.244-.002-.744.565-1.262a1.87 1.87 0 011.305-.517q.786 0 1.347.517.567.518.566 1.262"
                    fill="#ffffffff"
                  ></path>
                  <path
                    data-v-865b1154=""
                    d="M84.752.2H79.94v9.14h4.811z"
                    fill="#EC1E24"
                  ></path>
                </svg>
                <br />
                <p className="brand-sub">
                  {translations[language].brandSub}
                </p>
              </aside>
              <div className="form-pane">
                <div className="card-head">
                  <h1 id="login-title" className="title">
                    {translations[language].loginTitle}
                  </h1>
                  <div className={`lang ${isLangMenuOpen ? "open" : ""}`}>
                    <button
                      className="icon-btn"
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isLangMenuOpen}
                      aria-controls="lang-menu"
                      title="Language"
                      onClick={toggleLangMenu}
                    >
                      <FontAwesomeIcon icon={faGlobe} />
                    </button>
                    <div
                      className="lang-menu"
                      id="lang-menu"
                      role="menu"
                      aria-label="Languages"
                    >
                      <div
                        className="lang-item"
                        role="menuitem"
                        tabIndex={0}
                        onClick={() => handleLangChange("km")}
                      >
                        <span className="flag">
                          <Image
                            src="/khmer.png"
                            alt="Khmer"
                            width={16}
                            height={12}
                          />
                        </span>
                        <div>
                          <div>ខ្មែរ</div>
                        </div>
                      </div>
                      <div
                        className="lang-item"
                        role="menuitem"
                        tabIndex={0}
                        onClick={() => handleLangChange("en")}
                      >
                        <span className="flag">
                          <Image
                            src="/english.png"
                            alt="English"
                            width={16}
                            height={12}
                          />
                        </span>
                        <div>
                          <div>English</div>
                        </div>
                      </div>
                      <div
                        className="lang-item"
                        role="menuitem"
                        tabIndex={0}
                        onClick={() => handleLangChange("cn")}
                      >
                        <span className="flag">
                          <Image
                            src="/china.png"
                            alt="Chinese"
                            width={16}
                            height={12}
                          />
                        </span>
                        <div>
                          <div>中文</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <form className="form" onSubmit={handleLogin}>
                  <label className="label" htmlFor="username">
                    {translations[language].usernameLabel}{" "}
                    <span className="req">*</span>
                  </label>
                  <input
                    className="control"
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder={translations[language].usernamePlaceholder}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label className="label" htmlFor="password">
                    {translations[language].passwordLabel}{" "}
                    <span className="req">*</span>
                  </label>
                  <input
                    className="control"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder={translations[language].passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {error && (
                    <div className="error-message">{error}</div>
                  )}
                  <div className="actions">
                    <button className="btn" type="submit">
                      {translations[language].loginButton}
                    </button>
                  </div>
                  <div className="assist">
                    <a href="#" aria-label="Forgot password">
                      {translations[language].forgotPassword}
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
        <footer className="footer">
          <div className="footer-left">
            <Image src="/aba.svg" alt="ABA Bank Logo" width={160} height={60} />
            <div className="social-icons">
              <a href="#" aria-label="Facebook" className="social-icon facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" aria-label="YouTube" className="social-icon youtube">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="#" aria-label="LinkedIn" className="social-icon linkedin">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
          <div className="footer-right">
            <div className="footer-text" suppressHydrationWarning>
              <span className="bank-name">Advanced Bank of Asia Ltd.</span>
              <span className="address">
                  148 Preah
                Sihanouk Blvd, Sangkat Boeung Keng Kang I, Khan Boeung Keng
                Kang, Phnom Penh, Cambodia
              </span>
            </div>
            <a href="#" title="Privacy Policy" className="privacy-link">Privacy Policy</a>
          </div>
        </footer>
      </div>
      {/* styles moved to app/globals.css for faster builds */}
      <style jsx>{`
        @media (max-width: 780px) {
          .main {
            align-items: flex-start;
            padding-top: 0rem;
            padding-bottom: 1rem;
          }
        }
      `}</style>
    </>
  );
}

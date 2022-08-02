import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppFooter } from './cmps/AppFooter/AppFooter';
import { AppHeader } from './cmps/AppHeader/AppHeader';
import { ContactDetailsPage } from './pages/ContactDetailsPage/ContactDetailsPage';
import { ContactEditPage } from './pages/ContactEditPage/ContactEditPage';
import { ContactPage } from './pages/ContactPage/ContactPage';
import { HomePage } from './pages/HomePage/HomePage';
import { SignupPage } from './pages/SignupPage/SignupPage';
import { StatisticPage } from './pages/StatisticPage/StatisticPage';
import { TransactionsPage } from './pages/TransactionsPage/TransactionsPage';
import { UserDetailsPage } from './pages/UserDetailsPage/UserDetailsPage';
import { UserEditPage } from './pages/UserEditPage';

export const App = () => {
	return (
		<Router>
			<div className="App main-layout">
				<AppHeader />
				<Routes>
					<Route element={<ContactEditPage />} path="/contact/edit/:id?" />
					<Route element={<ContactDetailsPage />} path="/contact/:id" />
					<Route element={<ContactPage />} path="/contact" />
					<Route element={<UserEditPage />} path="/user/edit" />
					<Route element={<UserDetailsPage />} path="/user" />
					<Route element={<StatisticPage />} path="/statistic" />
					<Route element={<SignupPage />} path="/signup" />
					<Route element={<TransactionsPage />} path="/transactions" />
					<Route element={<HomePage />} path="/" />
				</Routes>
				<AppFooter />
			</div>
		</Router>
	);
};

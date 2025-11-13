import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, Download, FileText, FileCheck, ShoppingCart, DollarSign, Users, Settings, Trash2, Edit3, Save, X, Printer, User, Lock, Eye, EyeOff, Mail, Send, BarChart3, Bell, LogOut } from 'lucide-react';

const App = () => {
  const [currentView, setCurrentView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Données de l'application
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Administrateur',
      email: 'admin@kunect.com',
      password: 'admin123',
      role: 'admin',
      active: true
    },
    {
      id: 2,
      name: 'Comptable',
      email: 'comptable@kunect.com',
      password: 'compta123',
      role: 'user',
      active: true
    }
  ]);

  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Entreprise Alpha',
      address: '123 Rue Principale',
      city: 'Dakar',
      country: 'Sénégal',
      phone: '+221 77 123 4567',
      email: 'contact@alpha.sn',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Société Beta',
      address: '456 Avenue Centrale',
      city: 'Abidjan',
      country: 'Côte d\'Ivoire',
      phone: '+225 01 23 45 67',
      email: 'info@beta.ci',
      createdAt: '2024-02-20'
    }
  ]);
  
  const [documents, setDocuments] = useState([
    {
      id: 1,
      type: 'invoice',
      number: 'FAC-2024-001',
      clientId: 1,
      date: '2024-11-10',
      dueDate: '2024-12-10',
      amount: 150000,
      currency: 'FCFA',
      status: 'paid',
      deliveryDelay: '7 jours',
      warranty: '12 mois',
      paymentMethod: 'Virement bancaire',
      paymentTerms: '30 jours',
      items: [
        { description: 'Service de consultation', quantity: 1, unitPrice: 100000, total: 100000 },
        { description: 'Formation technique', quantity: 1, unitPrice: 50000, total: 50000 }
      ]
    },
    {
      id: 2,
      type: 'quote',
      number: 'DEV-2024-001',
      clientId: 2,
      date: '2024-11-15',
      dueDate: '2024-12-15',
      amount: 75000,
      currency: 'FCFA',
      status: 'pending',
      deliveryDelay: '5 jours',
      warranty: '6 mois',
      paymentMethod: 'Mobile Money',
      paymentTerms: 'À la commande',
      items: [
        { description: 'Audit technique', quantity: 1, unitPrice: 75000, total: 75000 }
      ]
    }
  ]);

  const [companyInfo, setCompanyInfo] = useState({
    name: 'KUNECT INVOICE',
    address: 'Immeuble Fann Résidence, Rue 10 x 12',
    city: 'Dakar',
    country: 'Sénégal',
    phone: '+221 77 888 9999',
    email: 'contact@kunect.com',
    website: 'www.kunect.com'
  });

  // États pour les formulaires
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '', address: '', city: '', country: '', phone: '', email: ''
  });

  const documentTypes = {
    invoice: { label: 'Facture', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    quote: { label: 'Devis', icon: FileCheck, color: 'text-green-600', bg: 'bg-green-50' },
    order: { label: 'Bon de commande', icon: ShoppingCart, color: 'text-purple-600', bg: 'bg-purple-50' }
  };

  const statusColors = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  // Fonctions principales
  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === loginForm.email && u.password === loginForm.password && u.active);
    if (user) {
      setCurrentUser(user);
      setCurrentView('main');
      setLoginError('');
    } else {
      setLoginError('Email ou mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
    setLoginForm({ email: '', password: '' });
  };

  const handleCreateDocument = (type) => {
    const newDoc = {
      id: documents.length + 1,
      type,
      number: `${type === 'invoice' ? 'FAC' : type === 'quote' ? 'DEV' : 'BC'}-2024-${String(documents.length + 1).padStart(3, '0')}`,
      clientId: clients[0]?.id || 1,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      amount: 0,
      currency: 'FCFA',
      status: 'pending',
      deliveryDelay: '7 jours',
      warranty: '12 mois',
      paymentMethod: 'Virement bancaire',
      paymentTerms: '30 jours',
      items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }]
    };
    setCurrentDocument(newDoc);
    setShowDocumentForm(true);
  };

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Client inconnu';
  };

  const handleCreateClient = () => {
    if (newClient.name && newClient.email) {
      const client = {
        id: clients.length + 1,
        ...newClient,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setClients([...clients, client]);
      setNewClient({ name: '', address: '', city: '', country: '', phone: '', email: '' });
      setShowNewClientForm(false);
    }
  };

  // Statistiques du dashboard
  const dashboardStats = {
    totalRevenue: documents.filter(doc => doc.status === 'paid').reduce((sum, doc) => sum + doc.amount, 0),
    pendingDocuments: documents.filter(doc => doc.status === 'pending').length,
    activeClients: clients.length,
    monthlyGrowth: 12.5
  };

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto bg-blue-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">KUNECT INVOICE</h2>
            <p className="text-gray-600">Solution de gestion commerciale</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="votre@email.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Compte démo: admin@kunect.com / admin123</p>
            <p>Compte user: comptable@kunect.com / compta123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">KUNECT INVOICE</h1>
                <p className="text-sm text-gray-500">Solution de gestion commerciale</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{currentUser?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'clients', label: 'Clients', icon: Users },
              { id: 'settings', label: 'Paramètres', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tableau de bord */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Chiffre d'affaires</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardStats.totalRevenue.toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Documents en attente</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardStats.pendingDocuments}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Clients actifs</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardStats.activeClients}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Croissance mensuelle</p>
                    <p className="text-2xl font-bold text-gray-900">+{dashboardStats.monthlyGrowth}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents Récents</h3>
                <div className="space-y-3">
                  {documents.slice(0, 5).map(doc => {
                    const DocIcon = documentTypes[doc.type].icon;
                    return (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${documentTypes[doc.type].bg}`}>
                            <DocIcon className={`h-4 w-4 ${documentTypes[doc.type].color}`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{doc.number}</p>
                            <p className="text-xs text-gray-500">{getClientName(doc.clientId)}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[doc.status]}`}>
                          {doc.status === 'paid' ? 'Payé' : doc.status === 'pending' ? 'En attente' : 'Confirmé'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleCreateDocument('invoice')}
                    className="p-4 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:border-blue-400 text-center"
                  >
                    <FileText className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Nouvelle Facture</p>
                  </button>
                  <button
                    onClick={() => handleCreateDocument('quote')}
                    className="p-4 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:border-green-400 text-center"
                  >
                    <FileCheck className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Nouveau Devis</p>
                  </button>
                  <button
                    onClick={() => setShowNewClientForm(true)}
                    className="p-4 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:border-purple-400 text-center"
                  >
                    <Users className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Nouveau Client</p>
                  </button>
                  <button
                    onClick={() => setActiveTab('documents')}
                    className="p-4 border-2 border-dashed border-orange-300 rounded-lg text-orange-600 hover:border-orange-400 text-center"
                  >
                    <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Voir Documents</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documents */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Gestion des Documents</h2>
                  <p className="text-sm text-gray-500 mt-1">Créez et gérez vos documents</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleCreateDocument('invoice')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Nouvelle Facture
                  </button>
                  <button
                    onClick={() => handleCreateDocument('quote')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                  >
                    <FileCheck className="h-4 w-4 mr-2" />
                    Nouveau Devis
                  </button>
                </div>
              </div>
            </div>

            {/* Liste des documents */}
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {documents.map((doc) => {
                      const DocIcon = documentTypes[doc.type].icon;
                      return (
                        <tr key={doc.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`p-2 rounded-lg ${documentTypes[doc.type].bg}`}>
                                <DocIcon className={`h-4 w-4 ${documentTypes[doc.type].color}`} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{doc.number}</div>
                                <div className="text-sm text-gray-500">{documentTypes[doc.type].label}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{getClientName(doc.clientId)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(doc.date).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {doc.amount.toLocaleString('fr-FR')} {doc.currency}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[doc.status]}`}>
                              {doc.status === 'paid' && 'Payé'}
                              {doc.status === 'pending' && 'En attente'}
                              {doc.status === 'confirmed' && 'Confirmé'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Clients */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Gestion des Clients</h2>
                  <p className="text-sm text-gray-500 mt-1">Liste de vos clients</p>
                </div>
                <button
                  onClick={() => setShowNewClientForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau Client
                </button>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localisation</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créé le</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clients.map((client) => (
                      <tr key={client.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{client.email}</div>
                          <div className="text-sm text-gray-500">{client.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {client.city}, {client.country}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {client.createdAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Paramètres */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900">Paramètres de l'Entreprise</h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={companyInfo.name}
                    onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={companyInfo.email}
                    onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={companyInfo.phone}
                    onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={companyInfo.city}
                    onChange={(e) => setCompanyInfo({...companyInfo, city: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={companyInfo.address}
                    onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Site web</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={companyInfo.website}
                    onChange={(e) => setCompanyInfo({...companyInfo, website: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal Nouveau Client */}
      {showNewClientForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Nouveau Client</h3>
              <button onClick={() => setShowNewClientForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nom de l'entreprise *"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={newClient.name}
                onChange={(e) => setNewClient({...newClient, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email *"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={newClient.email}
                onChange={(e) => setNewClient({...newClient, email: e.target.value})}
              />
              <input
                type="text"
                placeholder="Téléphone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={newClient.phone}
                onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
              />
              <input
                type="text"
                placeholder="Adresse"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={newClient.address}
                onChange={(e) => setNewClient({...newClient, address: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Ville"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={newClient.city}
                  onChange={(e) => setNewClient({...newClient, city: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Pays"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={newClient.country}
                  onChange={(e) => setNewClient({...newClient, country: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewClientForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateClient}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Créer Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Document Form */}
      {showDocumentForm && currentDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Nouveau Document</h3>
              <button onClick={() => setShowDocumentForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Échéance</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDocumentForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                onClick={() => setShowDocumentForm(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

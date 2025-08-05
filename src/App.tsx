import React, { useState } from 'react';
import { Search, Heart, User, Compass, Users, MapPin, Calendar, Star } from 'lucide-react';

const clubs = [
  {
    id: 1,
    name: "Tech Innovators",
    description: "Join fellow tech enthusiasts and innovators",
    category: "Technology",
    members: 1250,
    rating: 4.8,
    image: "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "San Francisco"
  },
  {
    id: 2,
    name: "Fitness Warriors",
    description: "Push your limits with our fitness community",
    category: "Fitness",
    members: 890,
    rating: 4.9,
    image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Los Angeles"
  },
  {
    id: 3,
    name: "Book Lovers Society",
    description: "Discover new worlds through reading",
    category: "Literature",
    members: 675,
    rating: 4.7,
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "New York"
  },
  {
    id: 4,
    name: "Photography Club",
    description: "Capture moments, create memories",
    category: "Arts",
    members: 543,
    rating: 4.6,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Seattle"
  },
  {
    id: 5,
    name: "Cooking Masters",
    description: "Master the art of culinary excellence",
    category: "Culinary",
    members: 721,
    rating: 4.8,
    image: "https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Chicago"
  },
  {
    id: 6,
    name: "Adventure Seekers",
    description: "Explore the great outdoors together",
    category: "Outdoor",
    members: 934,
    rating: 4.9,
    image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Denver"
  }
];

function App() {
  const [activeSection, setActiveSection] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (clubId: number) => {
    setFavorites(prev =>
      prev.includes(clubId)
        ? prev.filter(id => id !== clubId)
        : [...prev, clubId]
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'explore':
        return (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search clubs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              />
            </div>
            
            <div className="grid gap-4">
              {filteredClubs.map((club) => (
                <div
                  key={club.id}
                  className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex gap-4">
                    <div className="relative">
                      <img
                        src={club.image}
                        alt={club.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <button
                        onClick={() => toggleFavorite(club.id)}
                        className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                          favorites.includes(club.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white text-gray-400 hover:text-red-500'
                        } shadow-md`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(club.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg truncate">{club.name}</h3>
                        <div className="flex items-center gap-1 ml-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{club.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{club.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{club.members} members</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{club.location}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                          {club.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'clubs':
        return (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">My Clubs</h3>
            <p className="text-gray-500">Join clubs to see them here</p>
          </div>
        );
      
      case 'favorites':
        const favoriteClubs = clubs.filter(club => favorites.includes(club.id));
        return (
          <div>
            {favoriteClubs.length > 0 ? (
              <div className="grid gap-4">
                {favoriteClubs.map((club) => (
                  <div
                    key={club.id}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                  >
                    <div className="flex gap-4">
                      <img
                        src={club.image}
                        alt={club.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{club.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{club.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{club.members} members</span>
                          <span>•</span>
                          <span>{club.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Favorites Yet</h3>
                <p className="text-gray-500">Tap the heart icon to save clubs</p>
              </div>
            )}
          </div>
        );
      
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
                  <p className="text-gray-600">Member since 2024</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-600">Clubs Joined</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{favorites.length}</div>
                  <div className="text-sm text-gray-600">Favorites</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-600">Events</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                <span className="text-gray-700">Account Settings</span>
                <span className="text-gray-400">›</span>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                <span className="text-gray-700">Notifications</span>
                <span className="text-gray-400">›</span>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                <span className="text-gray-700">Privacy</span>
                <span className="text-gray-400">›</span>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                <span className="text-gray-700">Help & Support</span>
                <span className="text-gray-400">›</span>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'explore': return 'Explore Clubs';
      case 'clubs': return 'My Clubs';
      case 'favorites': return 'Favorites';
      case 'profile': return 'Profile';
      default: return 'ClubConnect';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900">{getSectionTitle()}</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6 pb-24">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {[
            { key: 'explore', icon: Compass, label: 'Explore' },
            { key: 'clubs', icon: Users, label: 'Clubs' },
            { key: 'favorites', icon: Heart, label: 'Favorites' },
            { key: 'profile', icon: User, label: 'Profile' }
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`flex flex-col items-center py-2 px-3 transition-all duration-200 ${
                activeSection === key
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${
                activeSection === key && key === 'favorites' && favorites.length > 0
                  ? 'fill-current'
                  : ''
              }`} />
              <span className="text-xs font-medium">{label}</span>
              {activeSection === key && (
                <div className="absolute bottom-0 w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default App;
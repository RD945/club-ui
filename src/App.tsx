import { useState, useMemo, useCallback } from 'react';
import { Search, Heart, User, Compass, Users, MapPin, Calendar, Star, Bell, TrendingUp as Trending, Award, Activity } from 'lucide-react';

const clubs = [
  {
    id: 1,
    name: "Tech Innovators",
    description: "Join fellow tech enthusiasts and innovators",
    category: "Technology",
    members: 1250,
    rating: 4.8,
    trending: true,
    newEvents: 3,
    image: "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Mumbai"
  },
  {
    id: 2,
    name: "Fitness Warriors",
    description: "Push your limits with our fitness community",
    category: "Fitness",
    members: 890,
    rating: 4.9,
    trending: false,
    newEvents: 1,
    image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Delhi"
  },
  {
    id: 3,
    name: "Book Lovers Society",
    description: "Discover new worlds through reading",
    category: "Literature",
    members: 675,
    rating: 4.7,
    trending: false,
    newEvents: 2,
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Bangalore"
  },
  {
    id: 4,
    name: "Photography Club",
    description: "Capture moments, create memories",
    category: "Arts",
    members: 543,
    rating: 4.6,
    trending: true,
    newEvents: 0,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Pune"
  },
  {
    id: 5,
    name: "Cooking Masters",
    description: "Master the art of culinary excellence",
    category: "Culinary",
    members: 721,
    rating: 4.8,
    trending: false,
    newEvents: 4,
    image: "https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Hyderabad"
  },
  {
    id: 6,
    name: "Adventure Seekers",
    description: "Explore the great outdoors together",
    category: "Outdoor",
    members: 934,
    rating: 4.9,
    trending: true,
    newEvents: 2,
    image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Chennai"
  }
];

function App() {
  const [activeSection, setActiveSection] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [joinedClubs, setJoinedClubs] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredClubs = useMemo(() => clubs.filter(club => {
    const matchesCategory = activeFilter === 'All' || club.category === activeFilter;
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          club.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [activeFilter, searchQuery]);

  const toggleFavorite = useCallback((clubId: number) => {
    setFavorites(prev =>
      prev.includes(clubId)
        ? prev.filter(id => id !== clubId)
        : [...prev, clubId]
    );
  }, []);

  const toggleJoinClub = useCallback((clubId: number) => {
    setJoinedClubs(prev =>
      prev.includes(clubId)
        ? prev.filter(id => id !== clubId)
        : [...prev, clubId]
    );
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'explore':
        return (
          <div className="space-y-4">
            {/* Search and Filter Bar */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search clubs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-300 shadow-md"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-gray-200 flex flex-col items-center justify-center shadow-md">
                <Users className="w-6 h-6 text-blue-500 mb-1" />
                <div className="text-xl font-bold text-gray-900">{clubs.length}</div>
                <div className="text-xs text-gray-500">Total Clubs</div>
              </div>
              <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-gray-200 flex flex-col items-center justify-center shadow-md">
                <Trending className="w-6 h-6 text-green-500 mb-1" />
                <div className="text-xl font-bold text-gray-900">{clubs.filter(c => c.trending).length}</div>
                <div className="text-xs text-gray-500">Trending</div>
              </div>
              <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-gray-200 flex flex-col items-center justify-center shadow-md">
                <Calendar className="w-6 h-6 text-red-500 mb-1" />
                <div className="text-xl font-bold text-gray-900">{clubs.reduce((sum, c) => sum + c.newEvents, 0)}</div>
                <div className="text-xs text-gray-500">New Events</div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['All', 'Technology', 'Fitness', 'Arts', 'Culinary', 'Outdoor', 'Literature'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeFilter === filter
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white/80 backdrop-blur-lg border border-gray-200 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Trending Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">Trending Now</h3>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {clubs.filter(club => club.trending).map((club) => (
                  <div key={club.id} className="flex-shrink-0 w-40 bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200 shadow-md overflow-hidden">
                    <img src={club.image} alt={club.name} className="w-full h-20 object-cover" />
                    <div className="p-3">
                      <p className="text-sm font-bold text-gray-900 truncate">{club.name}</p>
                      <p className="text-xs text-gray-600">{club.members} members</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid gap-4">
              {filteredClubs.map((club) => (
                <div
                  key={club.id}
                  className="group bg-white/80 backdrop-blur-lg rounded-xl p-5 shadow-lg border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-200 will-change-transform relative overflow-hidden"
                >
                  {/* Trending Badge */}
                  {club.trending && (
                    <div className="absolute top-3 left-3 bg-gray-900 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 z-10">
                      <Trending className="w-3 h-3" />
                      Trending
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 relative">
                    <div className="relative flex-shrink-0">
                      <img
                        src={club.image}
                        alt={club.name}
                        className="w-full sm:w-24 h-24 rounded-xl object-cover"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg mb-1">{club.name}</h3>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium text-gray-700">{club.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{club.members.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleFavorite(club.id)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                            favorites.includes(club.id)
                              ? 'bg-red-500 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${favorites.includes(club.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      
                                                                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">{club.description}</p>
                      
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{club.location}</span>
                        </div>
                        <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200">
                          {club.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Join button positioned in bottom right corner */}
                    <button
                      onClick={() => toggleJoinClub(club.id)}
                      className={`absolute bottom-2 right-4 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        joinedClubs.includes(club.id)
                          ? 'bg-gray-800 text-white hover:bg-gray-700 shadow-md'
                          : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md'
                      }`}
                    >
                      {joinedClubs.includes(club.id) ? 'Joined' : 'Join'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'clubs':
        const myClubs = clubs.filter(club => joinedClubs.includes(club.id));
        return (
          <div>
            {myClubs.length > 0 ? (
              <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-gray-200 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">Your Activity</h3>
                      <p className="text-sm text-gray-600">Member of {myClubs.length} clubs</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{myClubs.reduce((sum, c) => sum + c.newEvents, 0)}</div>
                      <div className="text-sm text-gray-600">New Events</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4">
                {myClubs.map((club) => (
                  <div
                    key={club.id}
                    className="bg-white/80 backdrop-blur-lg rounded-xl p-5 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 will-change-transform relative"
                  >
                    <div className="flex gap-4">
                      <img
                        src={club.image}
                        alt={club.name}
                        className="w-20 h-20 rounded-xl object-cover"
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-gray-900 text-lg">{club.name}</h3>
                          {club.newEvents > 0 && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              {club.newEvents} new
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{club.description}</p>
                        
                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{club.location}</span>
                          </div>
                          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200">
                            {club.category}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {club.members.toLocaleString()}
                            </span>
                          </div>
                          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all duration-200">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">My Clubs</h3>
                <p className="text-gray-500">Join clubs to see them here</p>
              </div>
            )}
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
                    className="bg-white/80 backdrop-blur-lg rounded-xl p-5 shadow-lg border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-200 will-change-transform relative"
                  >
                    <div className="flex gap-4">
                      <img
                        src={club.image}
                        alt={club.name}
                        className="w-24 h-24 rounded-xl object-cover"
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-gray-900 text-lg mb-1">{club.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-gray-700">{club.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{club.members.toLocaleString()}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 h-10 line-clamp-2 leading-relaxed">{club.description}</p>
                        
                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{club.location}</span>
                          </div>
                          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200">
                            {club.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleFavorite(club.id)}
                      className="absolute bottom-2 right-4 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
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
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">John Doe</h2>
                  <p className="text-gray-300">Member since 2024</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">Active Member</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">{joinedClubs.length}</div>
                  <div className="text-sm text-gray-300">Clubs Joined</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{favorites.length}</div>
                  <div className="text-sm text-gray-300">Favorites</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{joinedClubs.reduce((sum: number, id: number) => sum + (clubs.find(c => c.id === id)?.newEvents || 0), 0)}</div>
                  <div className="text-sm text-gray-300">New Events</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-gray-200 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Notifications</span>
                </button>
                <button className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">My Events</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-md border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                <span className="text-gray-700">Account Settings</span>
                <span className="text-gray-400">›</span>
              </div>
              <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-md border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                <span className="text-gray-700">Notifications</span>
                <span className="text-gray-400">›</span>
              </div>
              <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-md border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                <span className="text-gray-700">Privacy</span>
                <span className="text-gray-400">›</span>
              </div>
              <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-md border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-all duration-200 cursor-pointer">
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto scroll-container">
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 px-5 py-5 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Welcome back,</p>
              <h1 className="text-xl font-bold text-gray-900">
                John Doe
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="relative p-3 bg-white rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200">
              <Bell className="w-5 h-5" />
              {joinedClubs.reduce((sum, id) => sum + (clubs.find(c => c.id === id)?.newEvents || 0), 0) > 0 && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 pb-28">
        {renderContent()}
      </main>

      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl px-4 py-2 shadow-lg z-20">
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
              className={`flex flex-col items-center justify-center w-16 h-16 transition-all duration-300 rounded-xl relative ${
                activeSection === key
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 transition-transform duration-300 ${activeSection === key ? 'transform -translate-y-1' : ''}`} />
              <span className="text-xs font-medium">{label}</span>
              {key === 'clubs' && joinedClubs.length > 0 && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-gray-800 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {joinedClubs.length}
                </span>
              )}
              {key === 'favorites' && favorites.length > 0 && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {favorites.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default App;


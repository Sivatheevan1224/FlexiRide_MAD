// Manage Users Screen (Admin)
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/ui/card';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';

interface User {
  uid: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export default function ManageUsersScreen() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'users' | 'admins'>('all');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData: User[] = [];
      
      usersSnapshot.forEach((doc) => {
        usersData.push({
          uid: doc.id,
          ...doc.data()
        } as User);
      });

      // Sort by creation date (newest first)
      usersData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
      Alert.alert('Error', 'Failed to load users');
    }
    setLoading(false);
  };

  const { user: currentUser } = useAuth();
  
  const stats = {
    total: users.length,
    users: users.filter(u => u.role === 'user').length,
    admins: users.filter(u => u.role === 'admin').length,
    disabled: users.filter((u: any) => u.isDisabled).length,
  };


  const filteredUsers = users.filter((user) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'users') return user.role === 'user';
    if (activeTab === 'admins') return user.role === 'admin';
    return true;
  });

  const handleChangeRole = (user: User) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    Alert.alert(
      'Change User Role',
      `Change ${user.name}'s role to ${newRole}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              await updateDoc(doc(db, 'users', user.uid), {
                role: newRole
              });
              Alert.alert('Success', `User role updated to ${newRole}`);
              loadUsers();
            } catch (error) {
              Alert.alert('Error', 'Failed to update user role');
            }
          }
        }
      ]
    );
  };

  const handleToggleStatus = (user: any) => {
    const isCurrentlyDisabled = user.isDisabled;
    const action = isCurrentlyDisabled ? 'Enable' : 'Disable';
    
    Alert.alert(
      `${action} User`,
      `Are you sure you want to ${action.toLowerCase()} ${user.name}? ${!isCurrentlyDisabled ? 'They will not be able to login.' : 'They will be able to login again.'}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: action,
          style: isCurrentlyDisabled ? 'default' : 'destructive',
          onPress: async () => {
            try {
              await updateDoc(doc(db, 'users', user.uid), {
                isDisabled: !isCurrentlyDisabled
              });
              Alert.alert('Success', `User ${action.toLowerCase()}d successfully`);
              loadUsers();
            } catch (error) {
              Alert.alert('Error', `Failed to ${action.toLowerCase()} user`);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-blue-600 px-6 pt-6 pb-8 rounded-b-3xl">
          <View className="flex-row items-center mb-6" style={{ gap: 16 }}>
            <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace('/admin/home')}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold">Manage Users</Text>
          </View>

          {/* Tabs */}
          <View className="flex-row" style={{ gap: 12 }}>
            {(['all', 'users', 'admins'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full ${
                  activeTab === tab ? 'bg-white' : 'bg-white/20'
                }`}
              >
                <Text
                  className={`font-semibold capitalize ${
                    activeTab === tab ? 'text-blue-600' : 'text-white'
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="px-6 py-6">
          {/* Stats */}
          <View style={{ marginBottom: 24 }}>
            <Card>
            <View className="flex-row justify-around">
              <View className="items-center">
                <Text className="text-neutral-500 text-xs">Total Users</Text>
                <Text className="text-neutral-800 font-bold text-2xl">{stats.total}</Text>
              </View>
              <View className="w-px bg-slate-200" />
              <View className="items-center">
                <Text className="text-neutral-500 text-xs">Regular Users</Text>
                <Text className="text-blue-600 font-bold text-2xl">{stats.users}</Text>
              </View>
              <View className="w-px bg-slate-200" />
              <View className="items-center">
                <Text className="text-neutral-500 text-xs">Admins</Text>
                <Text className="text-purple-600 font-bold text-2xl">{stats.admins}</Text>
              </View>
            </View>
            </Card>
          </View>

          {/* Users List */}
          {loading ? (
            <View className="py-12">
              <ActivityIndicator size="large" color="#2563eb" />
              <Text className="text-center text-neutral-500 mt-4">Loading users...</Text>
            </View>
          ) : (
            <View>
              {filteredUsers.map((user) => (
                <View key={user.uid} style={{ marginBottom: 12 }}>
                  <Card>
                    <View>
                    {/* User Info */}
                    <View className="flex-row items-start justify-between">
                      <View className="flex-1">
                        <View className="flex-row items-center mb-1" style={{ gap: 8 }}>
                          <Text className="text-neutral-800 font-semibold text-base">
                            {user.name} {user.uid === currentUser?.uid ? '(You)' : ''}
                          </Text>
                          <View
                            className={`px-2 py-0.5 rounded-full ${
                              user.role === 'admin' ? 'bg-purple-100' : 'bg-blue-100'
                            }`}
                          >
                            <Text
                              className={`text-xs font-medium ${
                                user.role === 'admin' ? 'text-purple-700' : 'text-blue-700'
                              }`}
                            >
                              {user.role}
                            </Text>
                          </View>
                          {(user as any).isDisabled && (
                             <View className="bg-red-100 px-2 py-0.5 rounded-full">
                               <Text className="text-red-700 text-xs font-medium">Disabled</Text>
                             </View>
                          )}
                        </View>
                        <Text className="text-neutral-600 text-sm mb-1">{user.email}</Text>
                        <Text className="text-neutral-400 text-xs">
                          Joined: {new Date(user.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </Text>
                      </View>
                    </View>

                    {/* Action Buttons */}
                    {user.uid !== currentUser?.uid && (
                        <View className="flex-row pt-2 border-t border-slate-100" style={{ gap: 8 }}>
                        <TouchableOpacity
                            onPress={() => handleChangeRole(user)}
                            className="flex-1 bg-blue-50 px-3 py-2 rounded-lg flex-row items-center justify-center"
                            style={{ gap: 4 }}
                        >
                            <Ionicons
                            name={user.role === 'admin' ? 'person' : 'shield-checkmark'}
                            size={16}
                            color="#2563eb"
                            />
                            <Text className="text-blue-600 text-xs font-medium">
                            Make {user.role === 'admin' ? 'User' : 'Admin'}
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={() => handleToggleStatus(user)}
                            className={`${(user as any).isDisabled ? 'bg-green-50' : 'bg-red-50'} px-3 py-2 rounded-lg flex-row items-center`}
                            style={{ gap: 4 }}
                        >
                            <Ionicons name={(user as any).isDisabled ? "checkmark-circle" : "ban"} size={16} color={(user as any).isDisabled ? "#16a34a" : "#ef4444"} />
                            <Text className={`${(user as any).isDisabled ? 'text-green-600' : 'text-red-600'} text-xs font-medium`}>
                                {(user as any).isDisabled ? 'Enable' : 'Disable'}
                            </Text>
                        </TouchableOpacity>
                        </View>
                    )}
                  </View>
                  </Card>
                </View>
              ))}

              {filteredUsers.length === 0 && (
                <View className="py-12">
                  <Text className="text-center text-neutral-500">No users found</Text>
                </View>
              )}
            </View>
          )}

          <View className="h-4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

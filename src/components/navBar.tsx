import * as React from 'react';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/services/AuthContext'; // Importer le hook useAuth

const NavBar: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const { isAuthenticated } = useAuth(); // Utilisation du hook useAuth
    const username = 'Username'; // Remplacez ceci par la logique pour obtenir le nom d'utilisateur

    return (
        <div className=' relative flex flex-row justify-end w-full h-10 z-50'> 
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className='flex justify-center items-center w-20 h-20'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                        </Avatar>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        {username} {/* Affichez le nom d'utilisateur */}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link to="/">Home</Link>
                    </DropdownMenuItem>
                    {isAuthenticated ? (
                        <DropdownMenuItem onClick={onLogout}>
                            Logout
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem>
                            <Link to="/login">Login</Link>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default NavBar;
